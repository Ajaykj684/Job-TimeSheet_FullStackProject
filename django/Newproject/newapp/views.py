from newapp.models import Account,DailyTask 
from newapp.serialize import AccountSerializer, DailyTaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from datetime import datetime, timedelta
import datetime
from django.db.models.functions import TruncDate

from django.db.models import Sum,Count
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_admin'] = user.is_admin
        
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])

def getRoutes(request):
    routes =[
        '/api/token',
        '/api/token/refresh',
       

    ]
    return Response(routes)

class Home(APIView):
   
    def get(self,request):
        users=Account.objects.all()
        dlSerializeObj=AccountSerializer(users,many=True)
        return Response(dlSerializeObj.data)

    def post(self,request):
        serializeobj=AccountSerializer(data=request.data)
        if serializeobj.is_valid():
            serializeobj.save()
            return Response (200)
        return Response(serializeobj.errors)



class UserDelete(APIView):
    def post(self,request,id):

        try:
            detailobj=Account.objects.get(pk=id)
        except:
            return Response("Not found in DataBase")
        detailobj.delete()
        return Response (200)




class UserAdd(APIView):
    def post(self,request ):
        
        body = request.body.decode('utf-8')
        body = json.loads(body)
        email=body['email']
        username=body['username']
        password=body['password']
        phone=body['phone']
       
        user = Account.objects.create_user(email=email,username=username,password=password ,phone=phone,first_name="none",last_name="none")
        user.save()
        
        return Response (200)
       


#list tasks done today by employee
class TodayTask(APIView):
    def get(self, request , id):
        today = datetime.datetime.now().date()
        tasks =  DailyTask.objects.filter(Date  = today , user = id ).order_by('-id')
        obj = DailyTaskSerializer(tasks,many=True)
        return Response(obj.data)






#Add new task by employee
class AddTask(APIView):
    def post(self,request ):
        body = request.body.decode('utf-8')
        body = json.loads(body)
        task=body['task']
        time=str(body['time'])
        user=body['user']
        
        dt =datetime.datetime.strptime(time,"%H:%M")
        requestUser = Account.objects.get(username=user)
        
        DailyTask.objects.create(task=task , time=dt ,user=requestUser)
        return Response (200)


#filter last week tasks
class WeeklyTask(APIView):
    def get(self,request,id):

        one_week_ago = datetime.date.today() - timedelta(days=7)
     
        data = DailyTask.objects.filter(user=id, Date__gte=one_week_ago).order_by('-id')

        # current_date_and_time = datetime.datetime.now()
        # print(current_date_and_time,"ffyy")
        # new_time = current_date_and_time + timedelta(minutes=5, hours=1)

        obj = DailyTaskSerializer(data,many=True)
        return Response(obj.data)

    


#filter task done by monthly base
class MonthlyTask(APIView):
    def get(self,request,month,userid):
        
        fm = [ 2022 ,month , 1 ]
        
        if(month == 2):
            day=28

        elif (month % 2 == 0 ):
            day = 30
            
        elif(month % 2 != 0 ):
            day = 31
        

        todt = [ 2022 , month , day ]

        data = DailyTask.objects.filter(user = userid , Date__gte=datetime.date(fm[0],fm[1],fm[2]), Date__lte=datetime.date(todt[0],todt[1],todt[2])).order_by('-id')
     
        obj = DailyTaskSerializer(data,many=True)
        return Response(obj.data)
    
        

#chart
class DailyChart(APIView):
    def get(self, request,id):
        today = datetime.datetime.now().date()
        tasks =  DailyTask.objects.filter(Date  = today , user = id)
        obj = DailyTaskSerializer(tasks,many=True)
        return Response(obj.data)
        


class DateFilter(APIView):
    def post(self, request,id):
      
        body = request.body.decode('utf-8')
        body = json.loads(body)

        fromDate = body['fromDate']
        toDate = body['toDate']

        frm = fromDate.split("-")
        tod = toDate.split("-")

        fm = [int(x) for x in frm]
        todt = [int(x) for x in tod]
        print( fm , todt)
                
        data = DailyTask.objects.filter(user = id , Date__gte=datetime.date(fm[0],fm[1],fm[2]), Date__lte=datetime.date(todt[0],todt[1],todt[2])).order_by('-id')
        obj = DailyTaskSerializer(data,many=True)
        return Response(obj.data)



