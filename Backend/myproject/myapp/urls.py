from django.urls import path
from . import views
urlpatterns = [
    path('', views.add_todo),
path('view/', views.view_todo),
path('view/<int:id>/', views.Getupdatedata),

    path("delete/<int:id>/",views.Delete_todo),

path("edit/<int:id>/",views.Edit_todo)

]