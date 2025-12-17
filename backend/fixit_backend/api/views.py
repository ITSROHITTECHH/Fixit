from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response



def contact_page(request):
    return render(request, 'contact.html')




@api_view(['GET'])
def test_api(request):
    return Response({
        "status": "success",
        "message": "Fixit backend connected successfully 🚀"
    })


from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "Signup successful"})



from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def login_api(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    user = authenticate(request, username=email, password=password)

    if user is not None:
        return Response({"success": "Login successful"})
    else:
        return Response({"error": "Invalid credentials"}, status=401)




from .models import Contact
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def contact_api(request):
    name = request.data.get('name')
    email = request.data.get('email')
    subject = request.data.get('subject')
    message = request.data.get('message')

    if not all([name, email, subject, message]):
        return Response({"error": "All fields required"}, status=400)

    Contact.objects.create(
        name=name,
        email=email,
        subject=subject,
        message=message
    )

    return Response({"success": "Message sent successfully"})

