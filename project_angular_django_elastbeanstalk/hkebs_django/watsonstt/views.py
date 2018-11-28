from __future__ import unicode_literals
from django.shortcuts import get_object_or_404, render
from django.core.files.storage import default_storage
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models.fields.files import FieldFile
from django.views.generic import FormView
from django.views.generic.base import TemplateView
from django.contrib import messages
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
#################### forms 
from .forms import WordForm, SoundForm, Step1Form, Step2Form, Step3Form, Step6FormWord, Step6FormSond, TempWordForm, UploadFileForm
from .models import Word, Sound, Cred, Custid, Tempword, Tempsound
from django.views.decorators.csrf import csrf_exempt
import requests



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
#    return HttpResponse( status=200 )


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

#        Word.objects.all().delete()

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













def ngmain(request):
    return render(request, 'watsonstt/ngmain.html' )




def xhour1(request):
    return render(request, 'watsonstt/xhour1.html')

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

# messi
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

## AJS era ###################################################
@csrf_exempt
def singleword(request):
    Tempword.objects.all().delete()        
    return render(request, 'watsonstt/singleword.html' )

@csrf_exempt
def singlewordsave(request):

    if request.method == 'POST':
        json_data = json.loads( request.body )
        w = Tempword()
        w.hkword = json_data['Word']
        w.hkdisp = json_data['Disp']
        w.save()
        for x in json_data['soundslikearray']:
            w.tempsound_set.create( hksoundslike = x )

        print( "word = %s"%json_data['Word'] )
        print( "disp = %s"%json_data['Disp'] )
        for x in json_data['soundslikearray']:
            print( "sounds = %s"%x )
        
        print( messagewriter_fortempword1() )
        return HttpResponse( messagewriter_fortempword1() )
# the following else is meaningless, because this view is only called with the POST request
#    else:
#        return render(request, 'watsonstt/dynamictest.html')
def singlewordrender(request):
#    return HttpResponse( messagewriter_fortempword1() )
    message =  messagewriter_fortempword1()
    return render(request, 'watsonstt/singlewordrender.html', {'message': message})

################################################################
################################################################
################################################################
@csrf_exempt
def multiword(request):
    cred = Cred.objects.all()[0]
    cust = Custid.objects.all()[0]

    message1 = 'curl -u %s:%s' % ( cred.hkcred, cred.hkpawd )
    message2 = ' -X POST --header "Content-type:application/json"'
    message4 = ' https://stream.watsonplatform.net/speech-to-text/api/v1/customizations/%s/words/' % (cust.custID)
    message = message1 + message2 + message4

    return render(request, 'watsonstt/multiword.html', {'message': message})

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


# step1 delete the current one first
#            
# step2 run the curl command to get a new customization ID

# step 3 save the new customization ID



@csrf_exempt
def multiwordsave(request):

    if request.method == 'POST':

        cred = Cred.objects.all()[0]
        cust = Custid.objects.all()[0]

        message0 = request.read()

        message1 = 'curl -u %s:%s' % ( cred.hkcred, cred.hkpawd )
        message2 = ' -X POST --header "Content-type:application/json"'
        message4 = ' https://stream.watsonplatform.net/speech-to-text/api/v1/customizations/%s/words/' % (cust.custID)
        message3 = ' --date %s' % message0

        message = message1 + message2 + message3 + message4
        print( message )

        Word.objects.all().delete()

#        print( 'HKT: %s' % request.read() )
#        return HttpResponse( 'hello: ' )

#        json_data = json.loads( request.body )
        json_data = json.loads( message0 )
        
        wordobject = json_data['words']
        for w in wordobject:
            neww = Word()
            neww.hkword = w['word']
            neww.hkdisp = w['display_as']
            neww.save()
            for s in w['soundslikearray']:
                neww.sound_set.create( hksoundslike = w )

        return HttpResponse( status=200 )
#    else:
#        return render(request, 'watsonstt/dynamictest.html')



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

@csrf_exempt
def ang(request):
    return render(request, 'watsonstt/ang.html' )
##############################################################
import json
from StringIO import StringIO

@csrf_exempt
def dynamictest(request):

    if request.method == 'POST':

        json_data = json.loads( request.body )

        w = Word()
        w.hkword = json_data['Word']
        w.hkdisp = json_data['Disp']
        w.save()
        for x in json_data['soundslikearray']:
            w.sound_set.create( hksoundslike = x )

        print( json_data['Word'] )
        print( json_data['Disp'] )
        for x in json_data['soundslikearray']:
            print( x )
        
#        print( 'hkdict type = %s' % type( data ) )

#        print( 'HKT: %s' % request.read() )
#        hkdict = json.load( hkio )
#        print( 'hkdict type = %s' % type( hkdict) )
        

#        qd = request.POST
#        for x in qd.items():
#            print( x )
        return HttpResponse( 'hello: ' )



    else:
        return render(request, 'watsonstt/dynamictest.html')



#################### formset test
from django.forms import formset_factory, inlineformset_factory

def start(request):
    return render(request, 'watsonstt/start.html' )


##############################################################
##############################################################

from django.http import JsonResponse

def getcred(request):
    cred = Cred.objects.all()[0]
    return JsonResponse({'username': cred.hkcred, 'password': cred.hkpawd})

def getcust(request):
    cred = Custid.objects.all()[0]
    return JsonResponse({'customid': cred.custID})

def step1list(request):
    credlist = Cred.objects.all()
    return render(request, 'watsonstt/step1list.html', {'credlist': credlist})
def step1form(request):
    if request.method == 'POST':
        form = Step1Form(request.POST)
        if form.is_valid():
            hkdict = form.cleaned_data
            Cred.objects.all().delete()
            hk2 = Cred( hkcred=hkdict['credential'], hkpawd=hkdict['passwordal'] )
            hk2.save()
            return HttpResponseRedirect( reverse( 'watson:step1list') )
    else:
#        cred = Cred.objects.all()[0]
#        form = Step1Form( initial={'credential':cred.hkcred, 'passwordal':cred.hkpawd} )
        form = Step1Form( initial={'credential':'67158fa8-a9fb-4380-8368-d3f883da44fc', 'passwordal':'KOWFDbj9cG0B'} )
    return render(request, 'watsonstt/step1form.html', {'form': form})

##############################################################
##############################################################
def step2list(request):
    custidlist = Custid.objects.all()
    return render(request, 'watsonstt/step2list.html', {'custidlist': custidlist})

def step2form(request):
    if request.method == 'POST':
        form = Step2Form(request.POST)
        if form.is_valid():
            hkdict = form.cleaned_data

            message1='curl -u %s:%s' % ( hkdict['step2cred'].hkcred, hkdict['step2cred'].hkpawd )
            message2=' -X POST -H "Content-type: application/json"'
            message3=' --date {name:%s, base_model_name: %s, description: %s}' %(hkdict['step2name'], hkdict['step2modl'], hkdict['step2desc'])
            message = message1 + message2 + message3
# save the custID from the curl command
# step1 delete the current one first
#            Custid.objects.all().delete()
# step2 run the curl command to get a new customization ID
#            constcustid = "ebc32170-c0bb-11e6-9657-e53f14d32a55"
# step 3 save the new customization ID
#            custid = Custid( custID = constcustid )
#            custid.save()
            return HttpResponse( message )
    else:
#        custid = Custid.objects.all()[0]
#        form = Step2Form(initial={'custID':custid.custID} )
#        form = Step2Form(initial={'custID':'ebc32170-c0bb-11e6-9657-e53f14d32a55'} )
        form = Step2Form()
    return render(request, 'watsonstt/step2form.html', {'form': form})


## goto
##############################################################
##############################################################
def messagewriter_fortempword1():
# build the curl command
    word1 = Tempword.objects.all()[0]
    message = "%s and %s " % (word1.hkword, word1.hkdisp)
    sound1 = Tempsound.objects.all()
    mess1 = "["
    for x in sound1:
        mess1 = mess1 + x.hksoundslike + ", "
    mess1.rstrip(', ')
    mess1 = mess1 + "]"

    cred = Cred.objects.all()[0]
    cust = Custid.objects.all()[0]

    message1 = 'curl -u %s:%s' % ( cred.hkcred, cred.hkpawd )
    message2 = ' -X PUT --header "Content-type:application/json"'
    message3 = ' --data { "sounds_like": %s, "display_as": %s }' % (mess1, word1.hkdisp)
    message4 = ' https://stream.watsonplatform.net/speech-to-text/api/v1/customizations/%s/words/%s' % (cust.custID, word1.hkword )
    message = message1 + message2 + message3 + message4
    return message
# build the curl command  end

# when wanting to create both new word and new sounds at the same time..
def tempword1(request):
    SoundInlineFormSet = inlineformset_factory( Tempword, Tempsound, fields=('hksoundslike',) )
    if request.method == 'POST':
        wordform = TempWordForm( request.POST )
        wordid = wordform.save()
        formset = SoundInlineFormSet( request.POST, instance=wordid )
        if formset.is_valid():
            formset.save()

        return HttpResponse( messagewriter_fortempword1() )
#        return HttpResponseRedirect( reverse( 'watson:tempword2') )
    else:
        Tempword.objects.all().delete()
        wordform    = TempWordForm( )
        wordformset = SoundInlineFormSet()
    return render(request, 'watsonstt/tempword1.html', {'form': wordform, 'formset': wordformset})

def tempword2(request):
    wordlist = Tempword.objects.all()
    return render(request, 'watsonstt/tempword2.html', {'wordlist': wordlist})

## edit an existing word
# you can use an empty action attribute on a form to submit that form to the current page. 
def tempword3(request, word_id):
    SoundInlineFormSet = inlineformset_factory( Tempword, Tempsound, fields=('hksoundslike',) )
    if request.method == 'POST':
        word    = Tempword.objects.get(pk=word_id)
        formset = SoundInlineFormSet( request.POST, instance=word )
        if formset.is_valid():
            formset.save()
        return HttpResponse( 'formset test' )
    else:
        wordformset = SoundInlineFormSet()
    return render(request, 'watsonstt/tempword3.html', {'formset': wordformset})

## list all the sounds for a given word id
def tempword4(request, word_id):
    word     = Tempword.objects.get(pk=word_id)
    soundlist = Tempsound.objects.filter(hkwordkey_id=word_id)
    return render(request, 'watsonstt/tempword4.html', {'soundlist': soundlist})
## called from tempword3.html
def tempword5(request, sound_id):
    sound = get_object_or_404(Tempsound, pk=sound_id)
    sound.delete()
    wordlist = Tempword.objects.all()
#    return render(request, 'watsonstt/tempword2.html', {'wordlist': wordlist})
    return HttpResponseRedirect( reverse( 'watson:tempword2') )
## called from tempword3.html
def tempword6(request, word_id):
    word = get_object_or_404(Tempword, pk=word_id)
    word.delete()
    wordlist = Tempword.objects.all()
    return render(request, 'watsonstt/tempword2.html', {'wordlist': wordlist})


##############################################################
##############################################################
def step9formword(request):
    SoundInlineFormSet = inlineformset_factory( Word, Sound, fields=('hksoundslike',) )
    if request.method == 'POST':
        wordform = WordForm( request.POST )
        wordid = wordform.save()
        formset = SoundInlineFormSet( request.POST, instance=wordid )
        if formset.is_valid():
            formset.save()

        return HttpResponse( 'hello' )
#        return HttpResponseRedirect( reverse( 'watson:tempword2') )
    else:
        wordform    = WordForm( )
        wordformset = SoundInlineFormSet()
    return render(request, 'watsonstt/step9formword.html', {'wordform': wordform, 'soundform': wordformset})

#def step9formsond(request):
#    if request.method == 'POST':
#        form = SoundForm(request.POST)
#        if form.is_valid():
#            hkdict = form.cleaned_data
#            hk2 = Sound( hksoundslike = hkdict['sounds_like'], hkwordkey = hkdict['word_pair'] )
#            hk2.save()
#            return HttpResponse( 'hello: '+hkdict['sounds_like'] )
#    else:
#        form = SoundForm()
#    return render(request, 'watsonstt/step9formsond.html', {'form': form})

##############################################################
##############################################################
def step9home(request):
    wordlist = Word.objects.all()
#    for w in wordlist:
#        print( w.hkword, [ x.hksoundslike for x in w.sound_set.all() ] )
    return render(request, 'watsonstt/step9home.html', {'wordlist': wordlist})

def step9editword(request, word_id):
    SoundInlineFormSet = inlineformset_factory( Word, Sound, fields=('hksoundslike',) )
    if request.method == 'POST':
        word    = Word.objects.get(pk=word_id)
        formset = SoundInlineFormSet( request.POST, instance=word )
        if formset.is_valid():
            formset.save()
        return HttpResponse( 'formset test' )
    else:
        wordformset = SoundInlineFormSet()
    return render(request, 'watsonstt/step9editword.html', {'formset': wordformset})

## list all the sounds for a given word id
def step9soundaword(request, word_id):
    word     = Word.objects.get(pk=word_id)
    soundlist = Sound.objects.filter(hkwordkey_id=word_id)
    return render(request, 'watsonstt/step9soundsaword.html', {'soundlist': soundlist})

def step9deletesound(request, sound_id):
    sound = get_object_or_404(Sound, pk=sound_id)
    sound.delete()
#    wordlist = Word.objects.all()
#    return render(request, 'watsonstt/step9home.html', {'wordlist': wordlist})
    return HttpResponseRedirect( reverse( 'watson:step9home' ) )

def step9deleteword(request, word_id):
    word = get_object_or_404(Word, pk=word_id)
    word.delete()
#    wordlist = Word.objects.all()
#    return render(request, 'watsonstt/step9home.html', {'wordlist': wordlist})
    return HttpResponseRedirect( reverse( 'watson:step9home' ) )


#def step9listsound(request):
#    personlist = Sound.objects.all()
#    return render(request, 'watsonstt/step9listsound.html', {'personlist': personlist})



##############################################################
##############################################################
#def step6formword(request):
#    if request.method == 'POST':
#        form = Step6FormWord(request.POST)
#        if form.is_valid():
#            hkdict = form.cleaned_data
#            hkword = hkdict['step6word']  
#            hkdisp = hkdict['step6disp']
#            form2 = Step6FormSond( initial={'step6word':hkword, 'step6disp':hkdisp} )
#            return render(request, 'watsonstt/step6formsond.html', {'form': form2})
#    else: # the first time this page is called, we initialize the TempWord table
#        TempWord.objects.all().delete()
#        form = Step6FormWord()
#    return render(request, 'watsonstt/step6formword.html', {'form': form})
#def step6formsond(request):
#    if request.method == 'POST':
#        form = Step6FormSond(request.POST)
#        if form.is_valid():
#            hkdict = form.cleaned_data
#            hkword0 = hkdict['step6word']
#            hksndl0 = hkdict['step6sndl']
 #           hkdisp0 = hkdict['step6disp']
#            hktempword = TempWord( hkword = hkword0, hkdisp = hkdisp0, hksoundslike = hksndl0 )
#            hktempword.save()
 #           form2 = Step6FormSond( initial={'step6word':hkword0, 'step6disp':hkdisp0} )
#            return render(request, 'watsonstt/step6formsond.html', {'form': form2})
#            #redirect( 'step6final' )
#    else:
#        return HttpResponse(status=201)
#def step6final(request):
#    twordlist = TempWord.objects.all()
#    return render(request, 'watsonstt/step6final.html', {'twordlist': twordlist})





##############################################
##############################################
##############################################
def api1(request):
    if request.method == 'POST':
        if request.is_ajax():
            post_name = request.POST.get('name')
#            post_mail = request.POST.get('email')
#            post_comm = request.POST.get('comments')

#            with open("/tmp/temp.out", "w") as f:
#                f.write( 'hk debug name = ' + post_name + '\n')

#            data = { "email":post_mail , "name" : post_name, "comments" : post_comm }
            data = { "name" : 'api1 ajax' }
            return JsonResponse(data)
    else:
        pass

def api2(request):

    if request.method == 'POST':
        if request.is_ajax():
            post_name = request.POST.get('name')
#            post_mail = request.POST.get('email')
#            post_comm = request.POST.get('comments')

#            data = { "email":post_mail , "name" : post_name, "comments" : post_comm }
#            data = { "name" : post_name }
            data = { "name" : 'api2 ajax' }
            return JsonResponse(data)
    else:
        pass

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

#def get_name(request):
#    if request.method == 'POST':
#        form = NameForm(request.POST)
#        if form.is_valid():
#            hkdict = form.cleaned_data
#            hk2 = Person( hkname=hkdict['your_name'], hkmail=hkdict['your_mail'] )
#            hk2.save()
#            #return HttpResponse( 'hello: '+hkdict['your_name']   )
#            return HttpResponseRedirect( reverse( 'watson:list') )
##           return HttpResponseRedirect('/thanks/')
#    else:
#        form = NameForm()
#    return render(request, 'watsonstt/name.html', {'form': form})



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

