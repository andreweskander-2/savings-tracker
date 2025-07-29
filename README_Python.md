# Savings Tracker - Python Version

A desktop application built with Python and Tkinter for tracking your savings across different asset types.

## Features

- **Multi-Asset Tracking**: Track gold, USD, investments, bank certificates, and cash savings
- **Automatic Calculations**: Automatically calculates totals based on conversion rates
- **Growth Visualization**: Interactive charts showing savings growth over time
- **Data Persistence**: SQLite database for storing all your records
- **Easy Data Entry**: User-friendly forms with real-time calculations

## Installation

1. Make sure you have Python 3.7+ installed
2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Run the application:
   ```bash
   python savings_tracker.py
   ```

2. **Add Records**: Use the "Add Record" tab to enter your savings data
3. **View History**: Check the "History" tab to see all your records
4. **Monitor Growth**: Use the "Growth Chart" tab to visualize your savings over time

## Asset Types Tracked

- **Gold**: Enter coins and conversion rate (EGP per coin)
- **USD**: Enter dollars and conversion rate (EGP per USD)
- **Investments**: Direct EGP amount
- **Bank Certificates**: Direct EGP amount
- **Cash Savings**: Direct EGP amount

## Database

The application uses SQLite to store your data locally in `savings_tracker.db`. Your data is automatically saved and persisted between sessions.

## Charts

The growth chart shows:
- Total savings trend over time
- Individual asset type trends
- Easy-to-read formatting with values in thousands (K)

## Tips

- The application automatically calculates totals as you type
- Use the "Calculate" button to refresh calculations if needed
- Delete records by selecting them in the History tab and clicking "Delete Selected"
- The chart updates automatically when you add or delete records