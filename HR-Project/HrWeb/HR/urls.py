from django.urls import path , include
from  HR import views


urlpatterns = [
    path('', views.homepage),
    path('homepage/', views.homepage),
    path('add/', views.addpage),
    path('vacations/', views.list_vacations),
    path('search/', views.search),
    path('submit/', views.submitvacation),
    path('update', views.update),
    
    path('add_employee/',views.add_employee), 
    path('add_vac/',views.add_vacation),
    path('search-employees/',views.search_employees),

    path('list/' ,views.list )



]