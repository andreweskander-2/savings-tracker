import tkinter as tk
from tkinter import ttk, messagebox
import sqlite3
from datetime import datetime
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import pandas as pd

class SavingsTracker:
    def __init__(self, root):
        self.root = root
        self.root.title("Savings Tracker")
        self.root.geometry("1200x800")
        
        # Initialize database
        self.init_database()
        
        # Create GUI
        self.create_widgets()
        
        # Load data
        self.refresh_data()
    
    def init_database(self):
        """Initialize SQLite database"""
        self.conn = sqlite3.connect('savings_tracker.db')
        self.cursor = self.conn.cursor()
        
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS savings_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                gold_in_coins REAL NOT NULL,
                gold_conversion_value REAL NOT NULL,
                total_gold REAL NOT NULL,
                investments REAL NOT NULL,
                bank_certificates REAL NOT NULL,
                dollars_in_usd REAL NOT NULL,
                dollar_conversion_value REAL NOT NULL,
                dollars_in_egp REAL NOT NULL,
                cash_savings REAL NOT NULL,
                total REAL NOT NULL
            )
        ''')
        self.conn.commit()
    
    def create_widgets(self):
        """Create the main GUI widgets"""
        # Create notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Create tabs
        self.create_input_tab()
        self.create_history_tab()
        self.create_chart_tab()
    
    def create_input_tab(self):
        """Create the data input tab"""
        self.input_frame = ttk.Frame(self.notebook)
        self.notebook.add(self.input_frame, text="Add Record")
        
        # Main container
        main_container = ttk.Frame(self.input_frame)
        main_container.pack(fill='both', expand=True, padx=20, pady=20)
        
        # Title
        title_label = ttk.Label(main_container, text="Add New Savings Record", 
                               font=('Arial', 16, 'bold'))
        title_label.pack(pady=(0, 20))
        
        # Date section
        date_frame = ttk.LabelFrame(main_container, text="Date", padding=10)
        date_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Label(date_frame, text="Date:").grid(row=0, column=0, sticky='w', padx=(0, 10))
        self.date_var = tk.StringVar(value=datetime.now().strftime('%Y-%m-%d'))
        ttk.Entry(date_frame, textvariable=self.date_var, width=15).grid(row=0, column=1, sticky='w')
        
        # Gold section
        gold_frame = ttk.LabelFrame(main_container, text="Gold Holdings", padding=10)
        gold_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Label(gold_frame, text="Gold in Coins:").grid(row=0, column=0, sticky='w', padx=(0, 10))
        self.gold_coins_var = tk.StringVar()
        ttk.Entry(gold_frame, textvariable=self.gold_coins_var, width=15).grid(row=0, column=1, padx=(0, 20))
        
        ttk.Label(gold_frame, text="Gold Rate (EGP/coin):").grid(row=0, column=2, sticky='w', padx=(0, 10))
        self.gold_rate_var = tk.StringVar(value="3500")
        ttk.Entry(gold_frame, textvariable=self.gold_rate_var, width=15).grid(row=0, column=3, padx=(0, 20))
        
        ttk.Label(gold_frame, text="Total Gold (EGP):").grid(row=0, column=4, sticky='w', padx=(0, 10))
        self.total_gold_label = ttk.Label(gold_frame, text="0.00", foreground='green', font=('Arial', 10, 'bold'))
        self.total_gold_label.grid(row=0, column=5, sticky='w')
        
        # USD section
        usd_frame = ttk.LabelFrame(main_container, text="USD Holdings", padding=10)
        usd_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Label(usd_frame, text="Dollars (USD):").grid(row=0, column=0, sticky='w', padx=(0, 10))
        self.dollars_usd_var = tk.StringVar()
        ttk.Entry(usd_frame, textvariable=self.dollars_usd_var, width=15).grid(row=0, column=1, padx=(0, 20))
        
        ttk.Label(usd_frame, text="USD Rate (EGP/USD):").grid(row=0, column=2, sticky='w', padx=(0, 10))
        self.dollar_rate_var = tk.StringVar(value="31")
        ttk.Entry(usd_frame, textvariable=self.dollar_rate_var, width=15).grid(row=0, column=3, padx=(0, 20))
        
        ttk.Label(usd_frame, text="Dollars (EGP):").grid(row=0, column=4, sticky='w', padx=(0, 10))
        self.dollars_egp_label = ttk.Label(usd_frame, text="0.00", foreground='green', font=('Arial', 10, 'bold'))
        self.dollars_egp_label.grid(row=0, column=5, sticky='w')
        
        # Other savings section
        other_frame = ttk.LabelFrame(main_container, text="Other Savings (EGP)", padding=10)
        other_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Label(other_frame, text="Investments:").grid(row=0, column=0, sticky='w', padx=(0, 10))
        self.investments_var = tk.StringVar()
        ttk.Entry(other_frame, textvariable=self.investments_var, width=15).grid(row=0, column=1, padx=(0, 20))
        
        ttk.Label(other_frame, text="Bank Certificates:").grid(row=0, column=2, sticky='w', padx=(0, 10))
        self.certificates_var = tk.StringVar()
        ttk.Entry(other_frame, textvariable=self.certificates_var, width=15).grid(row=0, column=3, padx=(0, 20))
        
        ttk.Label(other_frame, text="Cash Savings:").grid(row=0, column=4, sticky='w', padx=(0, 10))
        self.cash_var = tk.StringVar()
        ttk.Entry(other_frame, textvariable=self.cash_var, width=15).grid(row=0, column=5)
        
        # Total section
        total_frame = ttk.LabelFrame(main_container, text="Total Savings", padding=10)
        total_frame.pack(fill='x', pady=(0, 20))
        
        self.total_label = ttk.Label(total_frame, text="EGP 0.00", 
                                   font=('Arial', 18, 'bold'), foreground='darkgreen')
        self.total_label.pack()
        
        # Buttons
        button_frame = ttk.Frame(main_container)
        button_frame.pack(fill='x')
        
        ttk.Button(button_frame, text="Calculate", command=self.calculate_totals).pack(side='left', padx=(0, 10))
        ttk.Button(button_frame, text="Save Record", command=self.save_record).pack(side='left', padx=(0, 10))
        ttk.Button(button_frame, text="Clear", command=self.clear_form).pack(side='left')
        
        # Bind events for auto-calculation
        for var in [self.gold_coins_var, self.gold_rate_var, self.dollars_usd_var, 
                   self.dollar_rate_var, self.investments_var, self.certificates_var, self.cash_var]:
            var.trace('w', lambda *args: self.calculate_totals())
    
    def create_history_tab(self):
        """Create the history tab"""
        self.history_frame = ttk.Frame(self.notebook)
        self.notebook.add(self.history_frame, text="History")
        
        # Create treeview for displaying records
        columns = ('Date', 'Gold (EGP)', 'USD (EGP)', 'Investments', 'Certificates', 'Cash', 'Total')
        self.tree = ttk.Treeview(self.history_frame, columns=columns, show='headings', height=15)
        
        # Define headings
        for col in columns:
            self.tree.heading(col, text=col)
            self.tree.column(col, width=120, anchor='center')
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(self.history_frame, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Pack widgets
        self.tree.pack(side='left', fill='both', expand=True, padx=(10, 0), pady=10)
        scrollbar.pack(side='right', fill='y', pady=10, padx=(0, 10))
        
        # Buttons frame
        buttons_frame = ttk.Frame(self.history_frame)
        buttons_frame.pack(fill='x', padx=10, pady=(0, 10))
        
        ttk.Button(buttons_frame, text="Refresh", command=self.refresh_data).pack(side='left', padx=(0, 10))
        ttk.Button(buttons_frame, text="Delete Selected", command=self.delete_record).pack(side='left')
    
    def create_chart_tab(self):
        """Create the chart tab"""
        self.chart_frame = ttk.Frame(self.notebook)
        self.notebook.add(self.chart_frame, text="Growth Chart")
        
        # Create matplotlib figure
        self.fig, self.ax = plt.subplots(figsize=(12, 6))
        self.canvas = FigureCanvasTkAgg(self.fig, self.chart_frame)
        self.canvas.get_tk_widget().pack(fill='both', expand=True, padx=10, pady=10)
        
        # Refresh button
        ttk.Button(self.chart_frame, text="Refresh Chart", command=self.update_chart).pack(pady=10)
    
    def calculate_totals(self):
        """Calculate all totals and update labels"""
        try:
            # Calculate gold total
            gold_coins = float(self.gold_coins_var.get() or 0)
            gold_rate = float(self.gold_rate_var.get() or 0)
            total_gold = gold_coins * gold_rate
            self.total_gold_label.config(text=f"{total_gold:,.2f}")
            
            # Calculate USD total
            dollars_usd = float(self.dollars_usd_var.get() or 0)
            dollar_rate = float(self.dollar_rate_var.get() or 0)
            dollars_egp = dollars_usd * dollar_rate
            self.dollars_egp_label.config(text=f"{dollars_egp:,.2f}")
            
            # Calculate grand total
            investments = float(self.investments_var.get() or 0)
            certificates = float(self.certificates_var.get() or 0)
            cash = float(self.cash_var.get() or 0)
            
            grand_total = total_gold + dollars_egp + investments + certificates + cash
            self.total_label.config(text=f"EGP {grand_total:,.2f}")
            
        except ValueError:
            pass  # Ignore invalid inputs during typing
    
    def save_record(self):
        """Save the current record to database"""
        try:
            # Get all values
            date = self.date_var.get()
            gold_coins = float(self.gold_coins_var.get() or 0)
            gold_rate = float(self.gold_rate_var.get() or 0)
            total_gold = gold_coins * gold_rate
            
            dollars_usd = float(self.dollars_usd_var.get() or 0)
            dollar_rate = float(self.dollar_rate_var.get() or 0)
            dollars_egp = dollars_usd * dollar_rate
            
            investments = float(self.investments_var.get() or 0)
            certificates = float(self.certificates_var.get() or 0)
            cash = float(self.cash_var.get() or 0)
            
            total = total_gold + dollars_egp + investments + certificates + cash
            
            # Insert into database
            self.cursor.execute('''
                INSERT INTO savings_records 
                (date, gold_in_coins, gold_conversion_value, total_gold, investments, 
                 bank_certificates, dollars_in_usd, dollar_conversion_value, 
                 dollars_in_egp, cash_savings, total)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (date, gold_coins, gold_rate, total_gold, investments, certificates,
                  dollars_usd, dollar_rate, dollars_egp, cash, total))
            
            self.conn.commit()
            
            messagebox.showinfo("Success", f"Record saved successfully!\nTotal: EGP {total:,.2f}")
            self.clear_form()
            self.refresh_data()
            
        except ValueError as e:
            messagebox.showerror("Error", "Please enter valid numbers for all fields.")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save record: {str(e)}")
    
    def clear_form(self):
        """Clear all form fields"""
        self.gold_coins_var.set("")
        self.dollars_usd_var.set("")
        self.investments_var.set("")
        self.certificates_var.set("")
        self.cash_var.set("")
        self.date_var.set(datetime.now().strftime('%Y-%m-%d'))
    
    def refresh_data(self):
        """Refresh the history treeview"""
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Fetch data from database
        self.cursor.execute('SELECT * FROM savings_records ORDER BY date DESC')
        records = self.cursor.fetchall()
        
        # Insert data into treeview
        for record in records:
            values = (
                record[1],  # date
                f"{record[4]:,.0f}",  # total_gold
                f"{record[9]:,.0f}",  # dollars_in_egp
                f"{record[5]:,.0f}",  # investments
                f"{record[6]:,.0f}",  # bank_certificates
                f"{record[10]:,.0f}",  # cash_savings
                f"{record[11]:,.0f}"   # total
            )
            self.tree.insert('', 'end', values=values, tags=(record[0],))  # Store ID in tags
        
        # Update chart
        self.update_chart()
    
    def delete_record(self):
        """Delete selected record"""
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Warning", "Please select a record to delete.")
            return
        
        if messagebox.askyesno("Confirm", "Are you sure you want to delete this record?"):
            for item in selected:
                record_id = self.tree.item(item)['tags'][0]
                self.cursor.execute('DELETE FROM savings_records WHERE id = ?', (record_id,))
                self.conn.commit()
            
            self.refresh_data()
            messagebox.showinfo("Success", "Record deleted successfully.")
    
    def update_chart(self):
        """Update the growth chart"""
        # Clear previous plot
        self.ax.clear()
        
        # Fetch data
        self.cursor.execute('SELECT date, total, total_gold, dollars_in_egp, investments, bank_certificates, cash_savings FROM savings_records ORDER BY date')
        data = self.cursor.fetchall()
        
        if not data:
            self.ax.text(0.5, 0.5, 'No data available', ha='center', va='center', transform=self.ax.transAxes)
            self.canvas.draw()
            return
        
        # Prepare data
        dates = [datetime.strptime(row[0], '%Y-%m-%d') for row in data]
        totals = [row[1] for row in data]
        gold = [row[2] for row in data]
        usd = [row[3] for row in data]
        investments = [row[4] for row in data]
        certificates = [row[5] for row in data]
        cash = [row[6] for row in data]
        
        # Plot total savings growth
        self.ax.plot(dates, totals, marker='o', linewidth=3, markersize=8, label='Total Savings', color='darkgreen')
        
        # Plot individual components
        self.ax.plot(dates, gold, marker='s', linewidth=2, label='Gold', color='gold', alpha=0.7)
        self.ax.plot(dates, usd, marker='^', linewidth=2, label='USD', color='green', alpha=0.7)
        self.ax.plot(dates, investments, marker='d', linewidth=2, label='Investments', color='blue', alpha=0.7)
        self.ax.plot(dates, certificates, marker='v', linewidth=2, label='Certificates', color='purple', alpha=0.7)
        self.ax.plot(dates, cash, marker='*', linewidth=2, label='Cash', color='red', alpha=0.7)
        
        # Formatting
        self.ax.set_title('Savings Growth Over Time', fontsize=16, fontweight='bold')
        self.ax.set_xlabel('Date', fontsize=12)
        self.ax.set_ylabel('Amount (EGP)', fontsize=12)
        self.ax.legend()
        self.ax.grid(True, alpha=0.3)
        
        # Format y-axis to show values in thousands
        self.ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'{x/1000:.0f}K'))
        
        # Rotate x-axis labels
        plt.setp(self.ax.xaxis.get_majorticklabels(), rotation=45)
        
        # Adjust layout
        self.fig.tight_layout()
        
        # Refresh canvas
        self.canvas.draw()
    
    def __del__(self):
        """Close database connection"""
        if hasattr(self, 'conn'):
            self.conn.close()

def main():
    root = tk.Tk()
    app = SavingsTracker(root)
    root.mainloop()

if __name__ == "__main__":
    main()