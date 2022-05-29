from django.contrib import admin
from habanaforms.models import *
from markdownx.admin import MarkdownxModelAdmin

# Register your models here.
admin.site.register(HabanaForm, MarkdownxModelAdmin)
admin.site.register(HabanaFormField, MarkdownxModelAdmin)
admin.site.register(HabanaFormResponse, MarkdownxModelAdmin)


