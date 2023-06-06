from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse
from .models import Employee,Vacations
import json

def addpage(request):
    return render(request, "add.html")
def homepage(request):
    return render(request, "index.html")
def list_vacations(request):
    return render(request, "list_vacations.html")
def search(request):
    return render(request, "search.html")
def submitvacation(request):
    return render(request, "submitvacation.html")
def update(request):
    return render(request, "update.html")



def add(request):
    return render(request, "add.html")
    
def add_employee(request):
    if (request.POST):
        _name = request.POST.get('name')
        _email = request.POST.get('email')
        _id = request.POST.get('id')
        _address = request.POST.get('address')
        _phone = request.POST.get('phone')
        _approved_vacation = request.POST.get('approved')
        _available_vacation = request.POST.get('vacation')
        _salary = request.POST.get('salary')
        _dob = request.POST.get('dob')
        _gender = request.POST.get('gender')
        _martial_status = request.POST.get('martial-status')
        # Save the employee to the database
        employee = Employee(
            name=_name,
            email=_email,
            id =_id,
            address=_address,
            phone=_phone,
            approved_vacation=_approved_vacation,
            available_vacation=_available_vacation,
            salary=_salary,
            dob=_dob,
            gender=_gender,
            martial_status=_martial_status
        )
        if Employee.objects.filter(id=_id).exists():
            return JsonResponse({'message': ' employee already exists'})

        employee.save()
        return JsonResponse({'message': 'employee added successfully'})
    return JsonResponse({'message': 'Invalid request'})
    

def search_employees(request):
    search_keyword = request.GET.get('search', '')

    # Perform the search query
    employees = Employee.objects.filter(name__icontains = search_keyword)

    # Prepare the response data
    results = []
    for employee in employees:
        results.append({
            'name': employee.name,
            'id': employee.id,
        })

    return JsonResponse(results, safe=False)


def list(request):
    lista = Vacations.objects.all()
    Vlist = []
    for i in lista:
        employeeName = Employee.objects.get(id=i.vacID).name
        Vlist.append(
            {
                "name": employeeName,
                "start": i.start,
                "end": i.end,
                "id": i.vacID,
                "reason": i.reason,
            }
        )
    return JsonResponse(Vlist, safe=False)





def add_vacation(request):
    if (request.POST):
        _start = request.POST.get('to')
        _end = request.POST.get('from')
        _id = request.POST.get('id')
        _rerason = request.POST.get('reason')
        # Save the employee to the database
        vac = Vacations(
            start  =  _start,
            end    =  _end ,
            vacID     =  _id ,
            reason = _rerason
        )
        if not Employee.objects.filter(id=_id).exists():
            return JsonResponse({'message': ' employee does not exists'})
        vac.save()
        return JsonResponse({'message': 'vacation submited successfully'})
    return JsonResponse({'message': 'Invalid request'})




def ACCEPT(request):
    _id = json.loads(request.body)['id']
    if Vacations.objects.filter(vacID=_id).exists():
        vacation = Vacations.objects.filter(vacID=_id)[0]
        vacation.delete()
        emp = Employee.objects.get(id=_id)
        emp.approved_vacation = int(emp.approved_vacation) + 1
        emp.available_vacation = int(emp.available_vacation) - 1
        emp.save()
        return JsonResponse({'message': 'vacation accepted successfully'})
    
    return JsonResponse({'message': "invalid request"})

def REJECT(request):
    _id = json.loads(request.body)['id']
    if Vacations.objects.filter(vacID=_id).exists():
        vacation = Vacations.objects.filter(vacID=_id)[0]
        vacation.delete()
        return JsonResponse({'message': 'vacation Rejected'})
    
    return JsonResponse({'message': "invalid request"})
