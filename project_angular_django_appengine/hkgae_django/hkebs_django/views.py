from django.http import JsonResponse

def send_email(request):

    if request.method == 'POST':
        if request.is_ajax():
            post_name = request.POST.get('name')
            data = { "name" : 'fuck ajax' }
            return JsonResponse(data)
    else:
        pass
