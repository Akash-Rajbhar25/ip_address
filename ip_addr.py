import ipaddress

ip_input=input("ENter your ip aaddress:")

#network
network=ipaddress.ip_network(ip_input,strict=False)

print("Netwrok address:",network.network_address)
print("Brodcast address:",network.broadcast_address)

hosts=list(network.hosts())
print("first host:",hosts[0])
print("Last host:",hosts[-1])
print("Host range:",len(hosts))