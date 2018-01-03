# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, HttpResponse
from .models import Note
# Create your views here.
def index(req):
    notes = Note.objects.all()
    return render(req, 'notes/index.html', {'notes' : notes})

def create(req):
    if(req.method == 'POST'):
        Note.objects.create(description = req.POST['desc'], title = req.POST['title'])
        return redirect('/');
       
def update(req, id):
    if(req.method == 'POST'):
        note = Note.objects.get(id=id)
        note.description = req.POST['update']
        note.save()
        context = {
            'notes': Note.objects.all()
        }
        return render(req, 'notes/notes_index.html', context)

def delete(req, id):
    Note.objects.filter(id=id).delete()  
    return redirect('/')