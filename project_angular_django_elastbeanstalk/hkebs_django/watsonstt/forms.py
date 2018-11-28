from django import forms
from .models import Word, Sound, Cred, Custid, Tempword, Tempsound
from django.forms import ModelForm

class UploadFileForm(forms.Form):
#    title = forms.CharField(max_length=50)
    file  = forms.FileField()

# step 1 resource
class Step1Form(forms.Form):
    credential = forms.CharField(label='credential', max_length=100)
    passwordal = forms.CharField(label='password',   max_length=100)

# step 2 resource
class Step2Form(forms.Form):
    step2name = forms.CharField(label='name',  max_length=100)
    step2modl = forms.CharField(label='modl',  max_length=100)
    step2desc = forms.CharField(label='desc',  max_length=100)
    step2cred = forms.ModelChoiceField( queryset=Cred.objects.all(), to_field_name="hkcred" )

# step 3 resource
class Step3Form(forms.Form):
    step3cred   = forms.ModelChoiceField( queryset=Cred.objects.all(),   to_field_name="hkcred" )
    step3custid = forms.ModelChoiceField( queryset=Custid.objects.all(), to_field_name="custID" )


# step 6 resource
class Step6FormWord(forms.Form):
    step6word = forms.CharField(label='step6word',  max_length=100)
    step6disp = forms.CharField(label='step6disp',  max_length=100)

class Step6FormSond(forms.Form):
    step6word = forms.CharField(label='step6word',  max_length=100)
    step6sndl = forms.CharField(label='step6sndl',  max_length=100)
    step6disp = forms.CharField(label='step6disp',  max_length=100)


##############################
class TempWordForm(ModelForm):
    class Meta:
        model = Tempword
        fields = ['hkword', 'hkdisp']
class TempSoundForm(ModelForm):
    class Meta:
        model = Tempsound
        fields = ['hksoundslike']
class WordForm(ModelForm):
    class Meta:
        model = Word
        fields = ['hkword', 'hkdisp']
class SoundForm(ModelForm):
    class Meta:
        model = Sound
        fields = ['hksoundslike']
#class SoundForm(forms.Form):
#    word_pair   = forms.ModelChoiceField( queryset=Word.objects.all(), to_field_name="hkword" )
#    sounds_like = forms.CharField(label='Sounds like',       max_length=100)
#class WordForm(forms.Form):
#    word_word = forms.CharField(label='Word',       max_length=100)
#    word_disp = forms.CharField(label='Display as', max_length=100)
# new using ModelForm

