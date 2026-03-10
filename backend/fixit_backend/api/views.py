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



# from django.contrib.auth.models import User
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# @api_view(['POST'])
# def signup(request):
#     email = request.data.get('email')
#     password = request.data.get('password')

#     if not email or not password:
#         return Response({"error": "All fields are required"}, status=400)

#     if User.objects.filter(username=email).exists():
#         return Response({"error": "User already exists"}, status=400)

#     user = User.objects.create_user(
#         username=email,   # 👈 EMAIL AS USERNAME
#         email=email,
#         password=password
#     )

#     return Response({"message": "Signup successful"})





from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
def signup(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response(
                {"error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return Response(
            {"message": "Signup successful"},
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        print("Signup error:", e)
        return Response(
            {"error": "Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )





  
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "username": user.username,
            "email": user.email
        }
    })







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







from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking

@api_view(['POST'])
def create_booking(request):
    data = request.data

    booking = Booking.objects.create(
        service=data.get('service'),
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        address=data.get('address'),
        date=data.get('date'),
        time=data.get('time'),
        description=data.get('description', '')
    )

    return Response({
        "success": "Booking created successfully",
        "booking_id": booking.id
    })







from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

def my_bookings(request):
    return JsonResponse({
        "user": {"name": request.user.username},
        "bookings": []
    })







