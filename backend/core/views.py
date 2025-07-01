# views.py
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CoinMarketList(APIView):
    def get(self, request):
        page = request.GET.get("page", 1)
        per_page = request.GET.get("per_page", 8)
        url = "https://api.coingecko.com/api/v3/coins/markets"
        params = {
            "vs_currency": "usd",
            "order": "market_cap_desc",
            "per_page": per_page,
            "page": page,
            "sparkline": "false",
        }

        try:
            response = requests.get(url, params=params)
            data = response.json()
        except Exception as e:
            return Response({"error": "Failed to fetch data."}, status=500)

        if isinstance(data, dict) and data.get("status", {}).get("error_code") == 429:
            return Response({"error": "Rate limit exceeded."}, status=429)

        if not isinstance(data, list):
            return Response({"error": "Unexpected response format."}, status=500)

        result = [{
            "id": coin["id"],
            "name": coin["name"],
            "symbol": coin["symbol"],
            "current_price": coin["current_price"],
            "high_24h": coin["high_24h"],
            "low_24h": coin["low_24h"],
            "price_change_percentage_24h": coin["price_change_percentage_24h"],
        } for coin in data]

        return Response(result)


class CoinDetail(APIView):
    def get(self, request, coin_id):
        url = f"https://api.coingecko.com/api/v3/coins/{coin_id}"
        params = {
            "localization": "false",
            "tickers": "false",
            "market_data": "true",
            "community_data": "false",
            "developer_data": "false",
            "sparkline": "false",
        }

        try:
            response = requests.get(url, params=params)
            data = response.json()
        except Exception as e:
            return Response({"error": "Failed to fetch data."}, status=500)

        if isinstance(data, dict) and data.get("status", {}).get("error_code") == 429:
            return Response({"error": "Rate limit exceeded."}, status=429)

        try:
            result = {
                "id": data["id"],
                "name": data["name"],
                "description": data["description"]["en"],
                "current_price": data["market_data"]["current_price"]["usd"],
                "high_24h": data["market_data"]["high_24h"]["usd"],
                "low_24h": data["market_data"]["low_24h"]["usd"],
                "price_changes": {
                    "24h": data["market_data"]["price_change_percentage_24h"],
                    "7d": data["market_data"]["price_change_percentage_7d"],
                    "14d": data["market_data"]["price_change_percentage_14d"],
                    "30d": data["market_data"]["price_change_percentage_30d"],
                    "60d": data["market_data"]["price_change_percentage_60d"],
                    "200d": data["market_data"]["price_change_percentage_200d"],
                    "1y": data["market_data"]["price_change_percentage_1y"],
                },
            }
            return Response(result)
        except KeyError:
            return Response({"error": "Unexpected data format."}, status=500)
