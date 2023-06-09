from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse
from .models import Employee,Vacations,Admin
import json

def addpage(request):
    return render(request, "add.html")
def homepage(request):
    return render(request, "index.html")
def loginpage(request):
    return render(request, "login.html")
def registerpage(request):
    return render(request, "register.html")
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
    _name = json.loads(request.body)['name']
    _email = json.loads(request.body)['email']
    _id = json.loads(request.body)['id']
    _address = json.loads(request.body)['address']
    _phone = json.loads(request.body)['phone']
    _approved_vacation = json.loads(request.body)['approved_vacations']
    _available_vacation = json.loads(request.body)['available_vacations']
    _salary = json.loads(request.body)['salary']
    _dob = json.loads(request.body)['dob']
    _gender = json.loads(request.body)['gender']
    _martial_status = json.loads(request.body)['martial-status']
    _admin_username = json.loads(request.body)['admin-username']
    _adminID = Admin.objects.get(username=_admin_username).id
    # Save the employee to the database
    if Employee.objects.filter(id=_id).exists():
        return JsonResponse({'message': ' employee already exists'})
    employee = Employee(
        name=_name,
        email=_email,
        id =_id,
        adminID = _adminID,
        address=_address,
        phone=_phone,
        approved_vacation=_approved_vacation,
        available_vacation=_available_vacation,
        salary=_salary,
        dob=_dob,
        gender=_gender,
        martial_status=_martial_status
    )
    employee.save()
    return JsonResponse({'message': 'employee added successfully'})
    

def search_employees(request):
    search_keyword = request.GET.get('search', '')
    admin = request.GET.get('Admin', '')

    # Perform the search query
    employees = Employee.objects.filter(name__icontains = search_keyword, adminID = Admin.objects.get(username=admin).id)
    # Prepare the response data
    results = []
    for employee in employees:
        results.append({
            'name': employee.name,
            'id': employee.id,
        })

    return JsonResponse(results, safe=False)


def list(request):
    _admin_username = json.loads(request.body)['admin-username']
    _adminID = Admin.objects.get(username=_admin_username).id
    lista = Vacations.objects.filter()
    Vlist = []
    for i in lista:
        employeeName = Employee.objects.get(id=i.vacID).name
        if (Employee.objects.get(id=i.vacID).adminID != _adminID):
            continue
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
    _start = json.loads(request.body)['from']
    _end = json.loads(request.body)['to']
    _id = json.loads(request.body)['id']
    _rerason = json.loads(request.body)['reason']
    # Save the employee to the database
    vac = Vacations(
        start  =  _start,
        end    =  _end ,
        vacID     =  _id ,
        reason = _rerason
    )
    if not Employee.objects.filter(id=_id).exists():
        return JsonResponse({'message': ' employee does not exists'})
    emp = Employee.objects.get(id=_id)
    if (emp.available_vacation <= 0):
        return JsonResponse({'message': 'no available vacations'})
    vac.save()
    return JsonResponse({'message': 'vacation submited successfully'})




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

def getEMPData(request):
    _id = json.loads(request.body)['id']
    _admin_username = json.loads(request.body)['admin-username']
    _adminID = Admin.objects.get(username=_admin_username).id
    if Employee.objects.filter(id=_id , adminID=_adminID).exists():
        emp = Employee.objects.get(id=_id, adminID=_adminID)
        return JsonResponse({
            'name': emp.name,
            'email': emp.email,
            'address': emp.address,
            'phone': emp.phone,
            'salary': emp.salary,
            'martialstatus': emp.martial_status,
            'availableVacations': emp.available_vacation,
        })
    else:
        return JsonResponse({'message': 'employee does not exists'})


def updateEMP(request):
    _id = json.loads(request.body)['id']
    _name = json.loads(request.body)['name']
    _email = json.loads(request.body)['email']
    _address = json.loads(request.body)['address']
    _phone = json.loads(request.body)['phone']
    _salary = json.loads(request.body)['salary']
    _martialstatus = json.loads(request.body)['maritalStatus']
    _availableVacations = json.loads(request.body)['availableVacations']
    _admin_username = json.loads(request.body)['admin-username']
    _adminID = Admin.objects.get(username=_admin_username).id
    if Employee.objects.filter(id=_id , adminID=_adminID).exists():
        emp = Employee.objects.get(id=_id, adminID=_adminID)
        emp.name = _name
        emp.email = _email
        emp.address = _address
        emp.phone = _phone
        emp.salary = _salary
        emp.martial_status = _martialstatus
        emp.available_vacation = _availableVacations
        emp.save()
        return JsonResponse({'message': 'employee updated successfully'})
    else:
        return JsonResponse({'message': 'employee does not exists'})
    
def login(request):
    _username = json.loads(request.body)['username']
    _password = json.loads(request.body)['password']
    if Admin.objects.filter(username=_username).exists():
        Acc = Admin.objects.get(username=_username)
        if Acc.password == _password:
            return JsonResponse({'message': 'Success'})
        else:
            return JsonResponse({'message': 'wrong password'})
    else:
        return JsonResponse({'message': 'employee does not exists'})

def register(request):
    _id = json.loads(request.body)['id']
    _username = json.loads(request.body)['username']
    _name = json.loads(request.body)['name']
    _password = json.loads(request.body)['password']
    _email = json.loads(request.body)['email']
    _phone = json.loads(request.body)['phone']
    if Admin.objects.filter(id=_id).exists():
        return JsonResponse({'message': ' id already exists'})
    elif Admin.objects.filter(username=_username).exists():
        return JsonResponse({'message': ' username already exists'})
    else:
        x = Admin(id=_id, username=_username, name = _name, password=_password, email=_email, phone=_phone);
        x.save()
        return JsonResponse({'message': 'Success'})
    

