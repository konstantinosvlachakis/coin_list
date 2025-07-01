from django.db import models

class Coin(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    current_price = models.DecimalField(max_digits=20, decimal_places=8)
    high_24h = models.DecimalField(max_digits=20, decimal_places=8)
    low_24h = models.DecimalField(max_digits=20, decimal_places=8)
    price_change_percentage_24h = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.symbol})"
