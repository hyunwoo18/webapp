from django.conf.urls import include, url
from django.contrib import admin

from . import views

urlpatterns = [
#    url(  r'^',            include('demo.urls',      namespace='band-instance' )  ),
#    url(  r'^demo/',       include('demo.urls',      namespace='band-instance' )  ),
    url(  r'^watson/',     include('watsonstt.urls', namespace='watson'        )  ),

#    url(  r'^d3js/',      include('d3js.urls',      namespace='d3jsns'        )  ),
#    url(  r'^amd/',       include('amddojo.urls',   namespace='amdns'         )  ),
#    url(  r'^send_email/', views.send_email,    name='email'),
]

#urlpatterns = [
#    url(r'^admin/', admin.site.urls),
#]
