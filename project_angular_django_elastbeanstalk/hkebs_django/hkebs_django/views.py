from django.http import JsonResponse


def send_email(request):

    if request.method == 'POST':
        if request.is_ajax():
            post_name = request.POST.get('name')
#            post_mail = request.POST.get('email')
#            post_comm = request.POST.get('comments')

#            with open("/tmp/temp.out", "w") as f:
#                f.write( 'hk debug name = ' + post_name + '\n')
#                f.write( 'hk debug mail = ' + post_mail + '\n')
#                f.write( 'hk debug comm = ' + post_comm + '\n')

#            data = { "email":post_mail , "name" : post_name, "comments" : post_comm }
#            data = { "name" : post_name }
            data = { "name" : 'fuck ajax' }
            return JsonResponse(data)
    else:
        pass
#        with open("/tmp/temp.out", "w") as f:
#            f.write( 'something is wrong ' + '\n')

