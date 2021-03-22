# Trabalho Prático 1

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/1R2L.png" alt="Cenário do protocolo 1"/>
</div>

> Utilize as seguintes redes para as interfaces dos routers e dos PCs: Configure os equipamentos, seguindo os seguintes passos.

### Defina as redes que vai usar
- Router 0 Fa 0/0
    - Rede: 192.168.10.0 - 255.255.255.0
- Router 0 Fa 0/1
    - 192.168.20.0 - 255.255.255.0

### Apague a configuração do router e reiniciei o router
```batch
Router> enable
Router# erase startup-config
Router# reload
```

### Quando o router reiniciar entre em modo de execução privilegiada. Liste as interfaces do router (anote o resultado).
```batch
Router> enable
Router# show ip interface brief
```
##### Resultado
```batch
Interface              IP-Address       OK? Method Status               Protocol
FastEthernet 0/0        unassigned      YES NVRAM  administratively down down
FastEthernet 0/1        unassigned      YES NVRAM  administratively down down
Vlan1                   unassigned      YES NVRAM  administratively down down
```

### Entre em modo de configuração. Altere o nome do router para R0.
```batch
Router# configure terminal
Router(config)# hostname R0
```
##### Resultado
```batch
R0(config)#
```

### Configure as duas interfaces FastEthernet:
```batch
R0(config)# interface fastEthernet 0/0
R0(config-if)# ip address 192.168.10.254 255.255.255.0
R0(config-if)# no shutdown

R0(config-if)#exit

R0(config)# interface fastEthernet 0/1
R0(config-if)# ip address 192.168.20.254 255.255.255.0
R0(config-if)# no shutdown
```
### Grave a configuração
```batch
R0(config-if)# exit
R0(config)# exit
R0# copy running-config startup-config
R0# reload
```

### Após a configuração verifique a conectividade entre os vários elementos da rede.
__Exemplo: PC 01__
```batch
C:\>ping 192.168.20.2
```
##### Resultado:
```batch
Pinging 192.168.20.2 with 32 bytes of data:

Request timed out.
Reply from 192.168.20.2: bytes=32 time<1ms TTL=127
Reply from 192.168.20.2: bytes=32 time=1ms TTL=127
Reply from 192.168.20.2: bytes=32 time<1ms TTL=127

Ping statistics for 192.168.20.2:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 1ms, Average = 0ms
```

### Verifique o resultado do comando traceroute
__Exemplo: PC 01 para PC 03__
```batch
C:\>tracert 192.168.20.1
```
##### Resultado:
```batch
Tracing route to 192.168.20.1 over a maximum of 30 hops:

  1   2 ms      1 ms      1 ms      192.168.10.254
  2   *         1 ms      0 ms      192.168.20.1

Trace complete.
```