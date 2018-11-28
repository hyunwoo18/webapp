from __future__ import unicode_literals
from django.conf.urls import url

from . import views

app_name='watsonstt'

urlpatterns = [
#    url( r'^', views.ngmain,     name='ngmain'),
    url( r'^ngmain/', views.ngmain,     name='ngmain'),

    url( r'^newwordlist/',    views.newwordlist,      name='newwordlist'),
    url( r'^newworddelete/',  views.newworddelete,    name='newworddelete'),
    url( r'^newwordsave/',    views.newwordsave,      name='newwordsave'),

    url( r'^angularcred/',    views.angularcred,      name='angularcred'),
    url( r'^angularcust/',    views.angularcust,      name='angularcust'),

    url( r'^getcred/',        views.getcred,          name='getcred'),
    url( r'^getcust/',        views.getcust,          name='getcust'),

    url( r'^filetest2/', views.filetest2,           name='filetest2'),

####### not used
# AJS era
###### 
    url( r'^generalquery/', views.generalquery, name='generalquery'),
    url( r'^executequery/', views.executequery, name='executequery'),
###### 
#    url( r'^tempword2/', views.tempword2,                     name='tempword2'),
#    url( r'^tempword3/(?P<word_id>[0-9]+)/', views.tempword3, name='tempword3'),
#    url( r'^tempword4/(?P<word_id>[0-9]+)/', views.tempword4, name='tempword4'),
#    url( r'^tempword5/(?P<sound_id>\d+)/', views.tempword5,   name='tempword5'),
#    url( r'^tempword6/(?P<word_id>\d+)/', views.tempword6,    name='tempword6'),

###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### 
# test
    url( r'^formsettest/', views.formsettest,           name='formsettest'),
]
