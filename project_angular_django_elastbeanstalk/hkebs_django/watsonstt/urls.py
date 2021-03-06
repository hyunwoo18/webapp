from __future__ import unicode_literals
from django.conf.urls import url

from . import views

app_name='watsonstt'

urlpatterns = [
#    url( r'^', views.ngmain,     name='ngmain'),
    url( r'^ngmain/', views.ngmain,     name='ngmain'),


    url( r'^newwordsave/',  views.newwordsave,    name='newwordsave'),
    url( r'^newwordlist/',  views.newwordlist,    name='newwordlist'),
    url( r'^newworddelete/',  views.newworddelete,    name='newworddelete'),


    url( r'^start/', views.start,       name='start'),

# XHR era
    url( r'^xhour1/',  views.xhour1,   name='xhour1'),
    url( r'^getcred/', views.getcred,  name='getcred'),
    url( r'^getcust/', views.getcust,  name='getcust'),
# XHR era
# AJS era
    url( r'^singleword/',       views.singleword,       name='singleword'),
    url( r'^singlewordsave/',   views.singlewordsave,   name='singlewordsave'),
    url( r'^singlewordrender/', views.singlewordrender, name='singlewordrender'),

    url( r'^multiword/',      views.multiword,        name='multiword'),
    url( r'^angularcred/',     views.angularcred,        name='angularcred'),
    url( r'^angularcust/',     views.angularcust,        name='angularcust'),
    url( r'^multiwordsave/',  views.multiwordsave,    name='multiwordsave'),

###### 
    url( r'^generalquery/', views.generalquery, name='generalquery'),
    url( r'^executequery/', views.executequery, name='executequery'),
###### 

    url( r'^ang/', views.ang,           name='ang'),


#    url( r'^tempword1/', views.tempword1,                     name='tempword1'),
    url( r'^tempword2/', views.tempword2,                     name='tempword2'),
    url( r'^tempword3/(?P<word_id>[0-9]+)/', views.tempword3, name='tempword3'),
    url( r'^tempword4/(?P<word_id>[0-9]+)/', views.tempword4, name='tempword4'),
    url( r'^tempword5/(?P<sound_id>\d+)/', views.tempword5,   name='tempword5'),
    url( r'^tempword6/(?P<word_id>\d+)/', views.tempword6,    name='tempword6'),

##### credential
    url( r'^step1list/', views.step1list,           name='step1list'),
    url( r'^step1form/', views.step1form,           name='step1form'),

###### customization
    url( r'^step2form/', views.step2form,           name='step2form'),
    url( r'^step2list/', views.step2list,           name='step2list'),

    url( r'^filetest1/', views.filetest1,           name='filetest1'),
    url( r'^filetest2/', views.filetest2,           name='filetest2'),

# AJS era end

###### 
#    url( r'^step6formword/', views.step6formword,           name='step6formword'),
#    url( r'^step6formsond/', views.step6formsond,           name='step6formsond'),
#    url( r'^step6final/',    views.step6final,              name='step6final'),
###### 
    url( r'^step9home/', views.step9home,              name='step9home'),
    url( r'^step9formword/', views.step9formword,        name='step9formword'),
    url( r'^step9editword/(?P<word_id>\d+)/', views.step9editword,   name='step9editword'),
    url( r'^step9soundaword/(?P<word_id>\d+)/', views.step9soundaword,   name='step9soundaword'),
    url( r'^step9deletesound/(?P<sound_id>\d+)/', views.step9deletesound,   name='step9deletesound'),
    url( r'^step9deleteword/(?P<word_id>\d+)/',   views.step9deleteword,   name='step9deleteword'),
#    url( r'^step9formsond/', views.step9formsond,        name='step9formsond'),
#    url( r'^step9listsound/', views.step9listsound,         name='step9listsound'),

###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### 
# test
    url( r'^formsettest/', views.formsettest,           name='formsettest'),

    url( r'^dynamictest/', views.dynamictest,                   name='dynamictest'),
    url( r'^api1/', views.api1,                   name='api1'),
    url( r'^api2/', views.api2,                   name='api2'),
# old
#    url( r'^form/', views.get_name,               name='form'),
# temp

#    url( r'^$',     views.HomePageView.as_view(),  name='home'),
]
