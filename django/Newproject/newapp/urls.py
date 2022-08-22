from django.urls import path
from . import views


from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)




urlpatterns = [
    #user
    path('',views.Home.as_view()),
    path('todayTask/<int:id>',views.TodayTask.as_view()),
    path('taskAdd/',views.AddTask.as_view()),

    path('weeklyTask/<int:id>',views.WeeklyTask.as_view()),
    path('monthlyTask/<int:month>/<int:userid>',views.MonthlyTask.as_view()),
    path('DateFilter/<int:id>',views.DateFilter.as_view()),



    #admin
    path('delete/<int:id>',views.UserDelete.as_view()),
    path('add/',views.UserAdd.as_view()),

    path('dailyChart/<int:id>',views.DailyChart.as_view()),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

