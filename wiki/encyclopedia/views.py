import markdown

from django.urls import reverse

from django.shortcuts import render, HttpResponseRedirect

from . import util

from .forms import EntryForm, EditEntryForm

import random


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def search(request):
    if "q" in request.GET:
        q = request.GET["q"].lower()
        titles = {x.lower(): x for x in util.list_entries()}
        search_results = []
        if not q:
            return HttpResponseRedirect(reverse("index"))
        for x in titles:
            if q == x:
                return HttpResponseRedirect(reverse("entry", args=[titles[x]]))
            elif q in x:
                search_results.append(titles[x])
        return render(request, "encyclopedia/search.html", {
                "results": search_results,
                "query": q
            })
    else:
        # What to do when user enters just the /search url  ??
        return HttpResponseRedirect(reverse("index"))

            

def entry(request, title):
    titles = {x.lower(): x for x in util.list_entries()}
    title = title.lower()
    if title in titles:
        return render(request, "encyclopedia/entry.html", {
            "entry": markdown.markdown(util.get_entry(titles[title])),
            "title": titles[title]
        })
    else:
        error = "Requested Page not Found"
        return render(request, "encyclopedia/error.html", {
            "error": error
        })

def new_entry(request):
    if request.method == "GET":
        form = EntryForm()
        return render(request, "encyclopedia/new_entry.html", {
            "form": form
        })
    else:
        form = EntryForm(request.POST)
        # Validate data and create a new entry from cleaned data
        if form.is_valid():
            title = form.cleaned_data["title"]
            entry = form.cleaned_data["entry"]
            entries = [x.lower() for x in util.list_entries()]
            if str(title).lower() in entries:
                error = "This page already exists"
                # Return Error
                return render(request, "encyclopedia/error.html", {
                    "error": error
                })
            else:
                # Save new entry on disk
                util.save_entry(title, entry)
                # Redirect to new entry's page
                return HttpResponseRedirect(reverse("entry", args=[title]))
        else:
            return render(request, "encyclopedia/new_entry.html", {
                "form": form
            })

def edit_entry(request, title):
    entries = {x.lower(): x for x in util.list_entries}
    if request.method == "GET":
        form = EditEntryForm(initial={"entry": util.get_entry(entries[title.lower()])})
        return render(request, "encyclopedia/edit_page.html", {
            "title": entries[title.lower()],
            "form": form
        })
    else:
        form = EditEntryForm(request.POST)
        if form.is_valid():
            util.save_entry(entries[title.lower()], form.cleaned_data["entry"])
            return HttpResponseRedirect(reverse("entry", args=[entries[title.lower()]]))
        else:
            return render(request, "encyclopedia/edit_page.html", {
            "title": entries[title.lower()],
            "form": form
            })
        
def random_entry(request):
    return HttpResponseRedirect(reverse("entry", args=[random.choice(util.list_entries())]))


