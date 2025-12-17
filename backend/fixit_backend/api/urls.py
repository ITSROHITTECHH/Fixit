from django.urls import path
from .views import test_api, signup, login_api,contact_api


urlpatterns = [
    path('test/', test_api),
    path('signup/', signup),
    path('login/',login_api),
    path('contact/', contact_api),
]



