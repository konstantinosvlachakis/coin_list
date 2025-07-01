# admin.py
from django.contrib import admin
from .models import Coin

@admin.register(Coin)
class CoinAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol', 'current_price', 'price_change_percentage_24h')
