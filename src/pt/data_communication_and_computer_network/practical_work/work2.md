# Trabalho prático 2

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/2R.png" alt="Cenário do protocolo 2"/>
</div>

> Utilize as seguintes redes para as interfaces dos routers e dos PCs: Configure os equipamentos, seguindo os seguintes passos.

### Defina as redes que vai usar
- Rede 1: 192.168.1.0 - 255.255.255.0
- Rede 2: 192.168.2.0 - 255.255.255.0
- Router 1 $\rightleftarrows$ Router 2: 10.10.10.0/30

### Apague a configuração do router e reiniciei o router
`Igual para os dois routers`
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

### Entre em modo de configuração. Altere o nome dos routers para R0 e R1.
`Procedimento é o mesmo para os dois routers`
```batch
Router# configure terminal
Router(config)# hostname R0
```
##### Resultado
```batch
R0(config)#
```

### Configure a Interface FastEthernet e a interface Serial

#### Router R0
```batch
R0(config)# interface fastEthernet 0/0
R0(config-if)# ip add 192.168.1.254 255.255.255.0
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# interface serial 0/0/0
R0(config-if)# ip address 10.10.10.1 255.255.255.252
R0(config-if)# clock rate 64000
R0(config-if)# no shutdown
```

#### Router R1
```batch
R1(config)# interface fastEthernet 0/0
R1(config-if)# ip address 192.168.2.254 255.255.255.0
R1(config-if)# no shutdown

R1(config-if)# exit

R1(config)# interface serial 0/0/0
R1(config-if)# ip address 10.10.10.2 255.255.255.252
R1(config-if)# no shutdown
```

#### Rotas do Router R0
```batch
R0(config)# ip route 192.168.2.0 255.255.255.0 10.10.10.2
R0(config)# exit
R0> show ip route
```

##### Resultado
```batch
     10.0.0.0/30 is subnetted, 1 subnets
C       10.10.10.0 is directly connected, Serial0/0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/0
S    192.168.2.0/24 [1/0] via 10.10.10.2
```

### Configure as rotas necessárias para que todos os host possam comunicar entre si.
```batch
R1(config)# ip route 192.168.1.0 255.255.255.0 10.10.10.1
R1(config)# exit
R1> show ip route
```
##### Resultado:
```batch
     10.0.0.0/30 is subnetted, 1 subnets
C       10.10.10.0 is directly connected, Serial0/0/0
S    192.168.1.0/24 [1/0] via 10.10.10.1
C    192.168.2.0/24 is directly connected, FastEthernet0/0
```

### Grave a configuração
`Igual para os dois routers`

#### Router 0
```batch
R0# copy running-config startup-config
R0# reload
```

### Após a configuração verifique a conectividade entre os vários elementos da rede.
__Exemplo: PC0 para PC1__
```batch
C:\>ping 192.168.2.1
````

##### Resultado:
```batch
Pinging 192.168.2.1 with 32 bytes of data:

Reply from 192.168.2.1: bytes=32 time=21ms TTL=126
Reply from 192.168.2.1: bytes=32 time=31ms TTL=126
Reply from 192.168.2.1: bytes=32 time=3ms TTL=126
Reply from 192.168.2.1: bytes=32 time=1ms TTL=126

Ping statistics for 192.168.2.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 31ms, Average = 14ms
```