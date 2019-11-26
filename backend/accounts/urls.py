from django.urls import path, include
from .views import Registration, Login, User
from knox import views as knox_views

urlpatterns = [
    path('auth/register', Registration.as_view()),
    path('auth/login', Login.as_view()),
    path('auth/user', User.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]