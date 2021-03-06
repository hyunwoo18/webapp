from __future__ import unicode_literals
from django.shortcuts import get_object_or_404, render
from django.core.files.storage import default_storage
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models.fields.files import FieldFile
from django.views.generic import FormView
from django.views.generic.base import TemplateView
from django.contrib import messages
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
#from django.http import JsonResponse
from django.urls import reverse
#################### forms 
from .forms import WordForm, SoundForm, Step1Form, Step2Form, Step3Form, Step6FormWord, Step6FormSond, TempWordForm, UploadFileForm
from .models import Word, Sound, Cred, Custid, Tempword, Tempsound
from django.views.decorators.csrf import csrf_exempt
import requests


#
#    if request.method == 'POST':
#            return HttpResponseRedirect( reverse( 'watson:step1list') )
#    else:
#    return render(request, 'watsonstt/step1form.html', {'form': form})

#def step1list(request):
#    credlist = Cred.objects.all()
#    return render(request, 'watsonstt/step1list.html', {'credlist': credlist})


#def tempword5(request, sound_id):
#    sound = get_object_or_404(Tempsound, pk=sound_id)
#    sound.delete()
#    wordlist = Tempword.objects.all()
#    return HttpResponseRedirect( reverse( 'watson:tempword2') )


#messi
def ngmain(request):
    return render(request, 'watsonstt/ngmain.html' )



def getcred(request):
#    cred = Cred.objects.all()[0]
#    return JsonResponse({'username': cred.hkcred, 'password': cred.hkpawd})
    return JsonResponse({'username': "hkcred", 'password': "hkpawd"})

def getcust(request):
#    cred = Custid.objects.all()[0]
#    return JsonResponse({'customid': cred.custID})
    return JsonResponse({'customid': "18"})

@csrf_exempt
def angularcred(request):
    if request.method == 'POST':
        json_data = json.loads( request.body )
        Cred.objects.all().delete()
        hk2 = Cred( hkcred=json_data['username'], hkpawd=json_data['password'] )
        hk2.save()
        return JsonResponse({'username': hk2.hkcred, 'password': hk2.hkpawd})

@csrf_exempt
def angularcust(request):
    if request.method == 'POST':
        json_data = json.loads( request.body )

        Custid.objects.all().delete()
        constcustid = "ebc32170-c0bb-11e6-9657-e53f14d32a55"
        custid = Custid( custID = constcustid )
        custid.save()

        # json_data['name'], json_data['model'], json_data['description']
        return JsonResponse({'customid': json_data['description']})

@csrf_exempt
def newwordlist(request):
    thelist = Word.objects.all()

    hkdict = []

    for w in thelist:

        tempdict = {}
        tempdict['hkid'] = w.id
        tempdict['word'] = w.hkword
        tempdict['disp'] = w.hkdisp
        templist = []
        for x in w.sound_set.all():
            templist.append( x.hksoundslike )
        tempdict['sond'] = templist

        hkdict.append( tempdict )
    print( hkdict )

    return JsonResponse( hkdict, safe=False)

@csrf_exempt
def newworddelete(request):
    if request.method == 'POST':
        message0 = request.read()
        print( 'HKT: %s' % message0 )
        json_data = json.loads( message0 )
        w = json_data
        word = get_object_or_404(Word, pk=w['hkid'] )
        word.delete()
        return HttpResponse( status=200 )

@csrf_exempt
def newwordsave(request):

    if request.method == 'POST':

        message0 = request.read()
        print( 'HKT: %s' % message0 )

        json_data = json.loads( message0 )
        w = json_data

        if 'hkid' in w:
            pkid = w['hkid']
            neww = Word.objects.get(pk= pkid)
            neww.hkword = w['Word']
            neww.hkdisp = w['Disp']
            neww.save()
            soundlist = Sound.objects.filter(hkwordkey_id=pkid)
            soundlist.delete()
            for s in w['soundslikearray']:
                neww.sound_set.create( hksoundslike = s )
        else:
            neww = Word()
            neww.hkword = w['Word']
            neww.hkdisp = w['Disp']
            neww.save()
            for s in w['soundslikearray']:
                neww.sound_set.create( hksoundslike = s )

        return HttpResponse( status=200 )

######### end of the list of views that are in use

## file test start
def handle_uploaded_file(f):
    with open('/Users/hyunwoo/name.txt', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def filetest1(request):
    if request.method == 'POST':
        form = UploadFileForm( request.POST, request.FILES )
        if form.is_valid():
            print( "test2" )

            hkdict = form.cleaned_data
#            print( hkdict['title'] )
            #handle_uploaded_file(request.FILES['file'])

            hkurl = 'http://127.0.0.1:8000/watson/filetest2/'
            files = {'file': request.FILES['file']}
            r = requests.post( hkurl, files=files )
# look at the main.py in 
# /Users/hyunwoo/RDG_Schematic/books_trilogy/book3_python/book_python_practical_nsauscc_olyg_files/project_oauth2/watson_python_test
# for how to access Watson api in the same manner as the curl command does
            return HttpResponse('hello from filetest1') # return HttpResponseRedirect('/success/url/')
    else:
        form = UploadFileForm()
    return render(request, 'watsonstt/upload.html', {'form': form})


@csrf_exempt
def filetest2(request):
    if request.method == 'POST':
        print( "filestest2" )
# not working
#        fff = request.FILES['file']
#        print( fff.read() )
# working
        message0 = request.read()
        print( message0 )
        print( "filestest3" )
    return HttpResponse('hello from filetest2')

##############################################################
# not used
##############################################################
def generalquery(request):
    if request.method == 'POST':
        form = Step3Form(request.POST)
        if form.is_valid():

            hkdict = form.cleaned_data
            message='cred=%s, customizationID = %s '%( hkdict['step3cred'].hkcred, hkdict['step3custid'].custID  )
            return HttpResponse( message )
    else:
        form = Step3Form()

        cred = Cred.objects.all()[0]
        cust = Custid.objects.all()[0]
        message1 = 'curl -u %s:%s' % ( cred.hkcred, cred.hkpawd )
        message2 = ' -X GET'
        message4 = ' https://stream.watsonplatform.net/speech-to-text/api/v1/customizations/%s' % (cust.custID)
        message = message1 + message2 + message4
        return render(request, 'watsonstt/generalquery.html', {'form': form, 'message': message})

def executequery(request):
    cred = Cred.objects.all()[0]
    cust = Custid.objects.all()[0]

    message1 = 'curl -u %s:%s' % ( cred.hkcred, cred.hkpawd )
    message2 = ' -X GET'
    message4 = ' https://stream.watsonplatform.net/speech-to-text/api/v1/customizations/%s' % (cust.custID)
    message = message1 + message2 + message4
    print( message )
    return HttpResponseRedirect( reverse( 'watson:start') )

## AJS era

##############################################################
import json
#################### formset test
from django.forms import formset_factory, inlineformset_factory

##############################################################
##############################################################
#messi

##############################################
##############################################
##############################################
####################################

class FakeField(object):
    storage = default_storage

fieldfile = FieldFile(None, FakeField, 'dummy.txt')

class HomePageView(TemplateView):
    template_name = 'watsonstt/home.html'
    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        messages.info(self.request, 'This is a demo of a message.')
        return context

# when working with an existing word
def formsettest1(request):
    word = Word.objects.get(pk=1)
    SoundInlineFormSet = inlineformset_factory( Word, Sound, fields=('hksoundslike',) )
    if request.method == 'POST':
        formset = SoundInlineFormSet( request.POST, instance=word )
        if formset.is_valid():
            formset.save()
        return HttpResponse( 'formset test' )
    else:
        wordformset = SoundInlineFormSet()
    return render(request, 'watsonstt/formsettest.html', {'formset': wordformset})

# when wanting to create both new word and new sounds at the same time..
def formsettest(request):
    SoundInlineFormSet = inlineformset_factory( Word, Sound, fields=('hksoundslike',) )
    if request.method == 'POST':
        wordform = WordForm( request.POST )
        wordid = wordform.save()
        formset = SoundInlineFormSet( request.POST, instance=wordid )
        if formset.is_valid():
            formset.save()
        return HttpResponse( 'formset test' )
    else:
        wordform = WordForm( )
        wordformset = SoundInlineFormSet()
    return render(request, 'watsonstt/formsettest2.html', {'form': wordform, 'formset': wordformset})

def formsettest0(request):
    if request.method == 'POST':
        return HttpResponse( 'formset test' )
    else:
        WordFormSet = formset_factory( WordForm, extra=2 )
        wordformset = WordFormSet()
    return render(request, 'watsonstt/formsettest.html', {'formset': wordformset})
#################### formset test

