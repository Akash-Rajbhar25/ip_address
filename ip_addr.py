import tkinter as tk
from tkinter import ttk
import ipaddress

def calc():
    ip = entry.get()
    try:
        net = ipaddress.ip_network(ip, strict=False)
        hosts = list(net.hosts())
        out_var.set(
            f"Network:   {net.network_address}\n"
            f"Broadcast: {net.broadcast_address}\n"
            f"First host: {hosts[0] if hosts else 'N/A'}\n"
            f"Last host:  {hosts[-1] if hosts else 'N/A'}\n"
            f"Host count: {len(hosts)}"
        )
    except:
        out_var.set("Invalid input")

root = tk.Tk()
root.title("IP Network Calculator")
root.geometry("420x260")
root.configure(bg="#1e1e1e")

style = ttk.Style()
style.theme_use("clam")
style.configure("TEntry", padding=6, foreground="black")
style.configure("TButton", padding=8)
style.configure("TLabel", background="#1e1e1e", foreground="white")

frame = ttk.Frame(root, padding=20)
frame.pack(fill="both", expand=True)

ttk.Label(frame, text="Enter IP / CIDR").pack(anchor="w")
entry = ttk.Entry(frame, width=30)
entry.pack(pady=5)

btn = ttk.Button(frame, text="Calculate", command=calc)
btn.pack(pady=10)

out_var = tk.StringVar()
out_lbl = ttk.Label(frame, textvariable=out_var, anchor="w", justify="left")
out_lbl.pack(fill="x")

root.mainloop()
