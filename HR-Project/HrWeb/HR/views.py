# from django.shortcuts import render# redirect
# from django.http import JsonResponse
# from HR.models import Employee
# import json


# def addpage(request):
#     return render(request, "add.html")
# def homepage(request):
#     return render(request, "index.html")
# def list_vacations(request):
#     return render(request, "list_vacations.html")
# def search(request):
#     return render(request, "search.html")
# def submitvacation(request):
#     return render(request, "submitvacation.html")
# def update(request):
#     return render(request, "update.html")



# def add_employee(request):
#     if request.method == 'POST':
#         # Retrieve  data from request
#         _name = request.POST.get('name-input')
#         _email = request.POST.get('email-input')
#         _id = request.POST.get('id-input')
#         _address = request.POST.get('address-input')
#         _phone = request.POST.get('phone-input')
#         _approved_vacation = request.POST.get('approved-vacation')
#         _available_vacation = request.POST.get('available-vacation')
#         _salary = request.POST.get('salary-input')
#         _dob = request.POST.get('dob-input')
#         _gender = request.POST.get('gender-input')
#         _martial_status = request.POST.get('martial-status-input')

#         # Save the employee to the database
#         employee = Employee(
#             id =_id,
#             name = _name,
#             email=_email,
#             address=_address,
#             phone=_phone,
#             approved_vacation=_approved_vacation,
#             available_vacation=_available_vacation,
#             salary=_salary,
#             dob=_dob,
#             gender=_gender,
#             martial_status=_martial_status
#         )

#         # if Employee.objects.filter(employee_id=_id).exists():
#         #     return JsonResponse({'message': 'employee already exists'})

#         employee.save()
#         return JsonResponse({'message': 'employee added successfully'})
#     return JsonResponse({'message': 'Invalid request'})

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
    

# def search_employees(request):
#     if(request.GET):
#         #word = request.GET.get('param', '') 
#         employees = Employee.objects.filter(name=param)
#         return JsonResponse(employees, content_type='application/json')
#     else:
#         return JsonResponse({'messsage':'it was not a get request'})


def search_employees(request):
    search_keyword = request.GET.get('search', '')

    # Perform the search query
    employees = Employee.objects.filter(name=search_keyword)

    # Prepare the response data
    results = []
    for employee in employees:
        results.append({
            'name': employee.name,
            'id': employee.id,
        })

    return JsonResponse(results, safe=False)


def list(request):
    print(500)
    lista = Vacations.objects.all() 
    data = list(lista.values())
    return JsonResponse(data,safe=False)





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
            return JsonResponse({'message': ' employee already exists'})
        vac.save()
        return JsonResponse({'message': 'vacation submited successfully'})
    return JsonResponse({'message': 'Invalid request'})
