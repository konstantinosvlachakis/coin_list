# urls.py
from django.urls import path
from .views import CoinMarketList, CoinDetail

urlpatterns = [
    path('coins/markets/', CoinMarketList.as_view()),
    path('coins/<str:coin_id>/', CoinDetail.as_view()),
]
