from django import forms

class EntryForm(forms.Form):
    template_name = "form_snippet.html"
    title = forms.CharField(
        label="New Page Title",
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "New Page Title"
        })
    )
    entry = forms.CharField(
        label="New Page Content",
        widget=forms.Textarea(attrs={
            "class": "form-control",
            "placeholder": "New Page Content"
        })
        )
    
class EditEntryForm(forms.Form):
    template_name = "form_snippet.html"
    entry = forms.CharField(
        widget=forms.Textarea(attrs={
            "class": "form-control"
        }),
        label="Edit Page Contents"
    )
    