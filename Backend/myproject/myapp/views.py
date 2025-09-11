from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Todo_test




@csrf_exempt
def add_todo(request):
    if request.method=="POST":
     try:
        load=json.loads(request.body)
        content=load.get('content')
        if not content:
            return JsonResponse({"Message":"Field is required"},status=400)
        db=Todo_test.objects.create(content=content)
        return JsonResponse({"The id": db.id, "The content": db.content}, status=201)
     except Exception as e:
         return JsonResponse({"The error":str(e)}, status=401)
    return JsonResponse({"message": "Method not allowed"}, status=405)



def view_todo(request):
    if request.method=="GET":
        try:
           db=Todo_test.objects.all().values("id","content")
           data=list(db)
           if not data:
               return JsonResponse({"message":"The Data Is Empty"},status=200)
           return JsonResponse(data,safe=False,status=200)
        except Exception as e:
         return JsonResponse({"Messge":str(e)},status=400)
    return JsonResponse({"message": "Method not allowed"}, status=405)


@csrf_exempt
def Delete_todo(request,id):
    if(request.method=="DELETE"):
        try:
            try:
                db=Todo_test.objects.get(id=id)
            except Todo_test.DoesNotExist:
                return JsonResponse({"Message":"To do not exists"},status=404)
            db.delete()
            return JsonResponse({"Message":"Deleted"}, status=200)
        except Exception as e:
            return JsonResponse({"Message":str(e)},status=400)
    return JsonResponse({"message": "Method not allowed"}, status=405)



def Getupdatedata(request,id):
    if(request.method=="GET"):
        try:
            db=Todo_test.objects.get(id=id)
            return JsonResponse({"content":db.content},status=200)
        except Exception as e:
            return JsonResponse({"Message":str(e)},status=400)
    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def Edit_todo(request,id):
    if(request.method=="PATCH"):
        try:
            load=json.loads(request.body)
            newcontent=load.get('content')

            db=Todo_test.objects.get(id=id)
            db.content=newcontent
            db.save()
            return JsonResponse({"Updated":db.content},status=200)
        except Exception as e:
            return JsonResponse({"Message":str(e)},status=400)
    return JsonResponse({"message": "Method not allowed"}, status=405)












