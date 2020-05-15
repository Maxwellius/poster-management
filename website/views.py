from django.shortcuts import render, redirect
from django.utils.translation import ugettext as _
from django.utils import translation 
from django.http import HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
import datetime
from .models import Demand

# Create your views here.

def index(request):
    print(translation.get_language())
    test = _("test")
    print(test)
    return render(request, 'website/index.html')

def newDemand(request):
    #try :
        if request.method == "POST":
            #Récupération des données de navigation :
            postData = request.POST

            #Validation des données de navigation :
            validate = True
            if postData["name"] == "" :
                validate = False
            elif postData["firstname"] == "" :
                validate = False
            elif postData["phoneNumber"] == "":
                validate = False
            elif postData["email"] == "":
                validate = False
            elif postData["building"] == "":
                validate = False
            elif postData["minimumDate"] == "":
                validate = False
            elif postData["height"] == "":
                validate = False
            elif postData["width"] == "":
                validate = False
            elif not 'file' in request.FILES.keys():
                validate = False

            if validate :
                #Valid Data have been transmitted, then continue
                #Manage the new File :
                #Rename :
                newFile = request.FILES['file']
                newDemand = Demand(
                    name = postData["name"],
                    firstname = postData["firstname"],
                    building = postData["building"],
                    phoneNumber = postData["phoneNumber"],
                    minimumDate = postData["minimumDate"],
                    email = postData["email"],
                    height = postData["height"],
                    width = postData["width"],
                    file = newFile,
                    comment = postData["comments"]
                )


                newDemand.clean_fields()
                newDemand.save()

                #Preparation du mail

                msg_plain = render_to_string('website/email.txt', {'newDemand': newDemand})
                msg_html = render_to_string('website/email.html', {'newDemand': newDemand})
                msg_plain = render_to_string('website/emailToManager.txt', {'newDemand': newDemand, 'datetime': datetime.datetime.now})
                msg_html = render_to_string('website/emailToManager.html', {'newDemand': newDemand})

                send_mail(
                    "[Geeps Poster] Demande d'impression poster",
                    msg_plain,
                    'no-reply@postermanager.com',
                    [newDemand.email],
                    html_message=msg_html,
                )

                response = redirect('success')
                response.status_code = 301
                return response
            else :
                #Les données sont invalides : Redirection sur le formulaire 
                response = redirect('/?error=Données non valides')
                response.status_code = 304
                return response
                
        else :
            #On utilise une autre methode que POST, Methode Interdite : Erreur
            response = HttpResponse('Method not allowed')
            response.status_code = 405
            return response
    #except :
    #    response = HttpResponse('Internal Server Error :')
    #    response.status_code = 500
    #    return response

def submitSuccess(request) : 
    return render(request, 'website/success.html')

