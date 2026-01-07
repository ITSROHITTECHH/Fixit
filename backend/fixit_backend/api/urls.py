from django.urls import path
from .views import test_api, signup, login_api,contact_api,create_booking,my_bookings


urlpatterns = [
    path('test/', test_api),
    path('signup/', signup),
    path('login/',login_api),
    path('contact/', contact_api),
    path('booking/', create_booking),
    path("my-bookings/", my_bookings),
    
]



# from django.urls import path
# from . import views

# urlpatterns = [
#     path('api/test/', views.test_api),
#     path('api/signup/', views.signup),
#     path('api/login/', views.login_api),
#     path('api/contact/', views.contact_api),
#     path('api/booking/', views.create_booking),
#     path('api/mybookings/', views.my_bookings),
# ]



