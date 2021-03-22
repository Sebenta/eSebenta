# Trabalho prático 3

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/3R2C3L.png" alt="Cenário do protocolo 3.1"/>
</div>

> Considere que dispõe das redes 192.168.0.0/24 a 192.168.10.0/24 para atribuir aos equipamentos. Configure os equipamentos seguindo os passos.

### Defina as redes que vai usar
- Rede 0: 192.168.0.0 - 255.255.255.0
- Rede 1: 192.168.1.0 - 255.255.255.0
- Rede 2: 192.168.2.0 - 255.255.255.0
- Router 0  Router 1: 192.168.3.0/30
- Router 1  Router 2: 192.168.3.4/30
- Router 0  Router 2: 192.168.3.8/30 (exercício 2)

### Apague a configuração do router
`Igual para todos os routers`
```batch
Router> enable
Router# erase startup-config
Router# reload
```

### Entre no modo de execução privilegiada. Liste as interfaces do router.
`Igual para todos os routers`
```batch
Router> enable
Router# show ip interface brief
```
##### Resultado
```batch
Interface              IP-Address      OK? Method Status                Protocol
FastEthernet0/0        unassigned      YES NVRAM  administratively down down
FastEthernet0/1        unassigned      YES NVRAM  administratively down down
Serial0/0/0            unassigned      YES NVRAM  administratively down down
Serial0/0/1            unassigned      YES NVRAM  administratively down down
Vlan1                  unassigned      YES NVRAM  administratively down down
```

### Entre em modo de configuração. Altere o nome do routers para R0, R1 e R2 conforme o caso
`O procedimento é o mesmo para todos`
```batch
Router# configure terminal
Router(config)# hostname R0
```

##### Resultado:
```batch
R0(config)#
```

###  Configure a interface Fast Ethernet e as interfaces Series

#### Router R0
```batch
R0(config)# interface fastEthernet 0/0
R0(config-if)# ip address 192.168.0.254 255.255.255.0
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# interface serial 0/0/0
R0(config-if)# ip address 192.168.3.1 255.255.255.252
R0(config-if)# clock rate 64000
R0(config-if)# no shutdown
```

#### Router R1
```batch
R1(config)# interface fastEthernet 0/0
R1(config-if)# ip address 192.168.1.254 255.255.255.0
R1(config-if)# no shutdown

R1(config-if)# exit

R1(config)# interface serial 0/0/0
R1(config-if)# ip address 192.168.3.2 255.255.255.252
R1(config-if)# no shutdown

R1(config-if)# exit

R1(config)# interface serial 0/0/1
R1(config-if)#ip address 192.168.3.5 255.255.255.252
R1(config-if)# clock rate 64000
R1(config-if)# no shutdown
```

#### Router R2
```batch
R2(config)# interface fastEthernet 0/0
R2(config-if)# ip address 192.168.2.254 255.255.255.0
R2(config-if)# no shutdown

R2(config-if)# exit

R2(config)# interface serial 0/0/0
R2(config-if)# ip address 192.168.3.6 255.255.255.252
R2(config-if)# no shutdown
```

### Configure as rotas estáticas. E confirme quais as rotas conhecidas pelos routers.

#### Router 0
```batch
R0(config)# ip route 192.168.1.0 255.255.255.0 192.168.3.2
R0(config)# ip route 192.168.2.0 255.255.255.0 192.168.3.2
R0(config)# ip route 192.168.3.4 255.255.255.252 192.168.3.2
R0(config)# do show ip route
R0(config)# exit
R0# write memory
```

##### Resultado:
```batch
C    192.168.0.0/24 is directly connected, FastEthernet0/0
S    192.168.1.0/24 [1/0] via 192.168.3.2
S    192.168.2.0/24 [1/0] via 192.168.3.2
     192.168.3.0/30 is subnetted, 2 subnets
C       192.168.3.0 is directly connected, Serial0/0/0
S       192.168.3.4 [1/0] via 192.168.3.2
```

### Router 1
```batch
R1(config)# ip route 192.168.0.0 255.255.255.0 192.168.3.1
R1(config)# ip route 192.168.2.0 255.255.255.0 192.168.3.6
R1(config)# do show ip route
R1(config)# exit
R1# write memory
```

##### Resultado:
```batch
S    192.168.0.0/24 [1/0] via 192.168.3.1
C    192.168.1.0/24 is directly connected, FastEthernet0/0
S    192.168.2.0/24 [1/0] via 192.168.3.6
     192.168.3.0/30 is subnetted, 2 subnets
C       192.168.3.0 is directly connected, Serial0/0/0
C       192.168.3.4 is directly connected, Serial0/0/1
```

### Router 2
```batch
R2(config)# ip route 192.168.0.0 255.255.255.0 192.168.3.5
R2(config)# ip route 192.168.1.0 255.255.255.0 192.168.3.5
R2(config)# ip route 192.168.3.0 255.255.255.0 192.168.3.5
R2(config)# do show ip route
R2(config)# exit
R2# write memory
```

#### Resultado:
```batch
S    192.168.0.0/24 [1/0] via 192.168.3.5
S    192.168.1.0/24 [1/0] via 192.168.3.5
C    192.168.2.0/24 is directly connected, FastEthernet0/0
     192.168.3.0/24 is variably subnetted, 2 subnets, 2 masks
S       192.168.3.0/24 [1/0] via 192.168.3.5
C       192.168.3.4/30 is directly connected, Serial0/0/0
```

### Verifique a conetividade entre as redes utilizando o comando ping
`PC0 como exemplo`

__PC0 $\to$ PC4__
```batch
C:\>ping 192.168.2.1
```

##### Resultado:
```batch
Pinging 192.168.2.1 with 32 bytes of data:

Request timed out.
Reply from 192.168.2.1: bytes=32 time=3ms TTL=125
Reply from 192.168.2.1: bytes=32 time=3ms TTL=125
Reply from 192.168.2.1: bytes=32 time=114ms TTL=125

Ping statistics for 192.168.2.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 3ms, Maximum = 114ms, Average = 40ms
```

__PC0 $\to$ R2 Serial 0/0/0__
```batch
C:\>ping 192.168.3.6
```

##### Resultado:
```batch
Pinging 192.168.3.6 with 32 bytes of data:

Reply from 192.168.3.6: bytes=32 time=314ms TTL=253
Reply from 192.168.3.6: bytes=32 time=2ms TTL=253
Reply from 192.168.3.6: bytes=32 time=2ms TTL=253
Reply from 192.168.3.6: bytes=32 time=2ms TTL=253

Ping statistics for 192.168.3.6:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 314ms, Average = 80ms
```

__PC0 $\to$ R1 Serial 0/0/0__
```batch
C:\>ping 192.168.3.2
```

##### Resultado:

```batch
Pinging 192.168.3.2 with 32 bytes of data:

Reply from 192.168.3.2: bytes=32 time=341ms TTL=254
Reply from 192.168.3.2: bytes=32 time=1ms TTL=254
Reply from 192.168.3.2: bytes=32 time=1ms TTL=254
Reply from 192.168.3.2: bytes=32 time=1ms TTL=254

Ping statistics for 192.168.3.2:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 341ms, Average = 86ms
```

__PC0 $\to$ PC2__
```batch
C:\>ping 192.168.1.1
```

##### Resultado:

```batch
Pinging 192.168.1.1 with 32 bytes of data:

Request timed out.
Reply from 192.168.1.1: bytes=32 time=2ms TTL=126
Reply from 192.168.1.1: bytes=32 time=2ms TTL=126
Reply from 192.168.1.1: bytes=32 time=2ms TTL=126

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 2ms, Average = 2ms
```

### Realize as alterações necessária para recriar o próximo cenário

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/3R3C3L.png" alt="Cenário do protocolo 3.2"/>
</div>

#### Router R0
```batch
R0> enable
R0# configure terminal
R0(config)# interface serial 0/0/1
R0(config-if)# ip address 192.168.3.9 255.255.255.252
R0(config-if)# clock rate 64000
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# ip route 192.168.3.4 255.255.255.252 192.168.3.10
R0(config)# ip route 192.168.2.0 255.255.255.0 192.168.3.10

R0(config)# do show ip route
```

##### Resultado:
```batch
C    192.168.0.0/24 is directly connected, FastEthernet0/0
S    192.168.1.0/24 [1/0] via 192.168.3.2
                    [1/0] via 192.168.3.10
S    192.168.2.0/24 [1/0] via 192.168.3.2
                    [1/0] via 192.168.3.10
     192.168.3.0/30 is subnetted, 3 subnets
C       192.168.3.0 is directly connected, Serial0/0/0
S       192.168.3.4 [1/0] via 192.168.3.2
                    [1/0] via 192.168.3.10
C       192.168.3.8 is directly connected, Serial0/0/1
```

#### Router R2
```batch
R2> enable
R2# configure terminal
R2(config)# interface serial 0/0/1
R2(config-if)# ip address 192.168.3.10 255.255.255.252
R2(config-if)# no shutdown

R0(config-if)# exit

R2(config)#ip route 192.168.3.0 255.255.255.252 192.168.3.9
R2(config)#ip route 192.168.1.0 255.255.255.0 192.168.3.9
R2(config)#ip route 192.168.0.0 255.255.255.0 192.168.3.9

R2(config)# do show ip route
```

##### Resultado:
```batch
S    192.168.0.0/24 [1/0] via 192.168.3.5
                    [1/0] via 192.168.3.9
S    192.168.1.0/24 [1/0] via 192.168.3.5
                    [1/0] via 192.168.3.9
C    192.168.2.0/24 is directly connected, FastEthernet0/0
     192.168.3.0/30 is subnetted, 3 subnets
S       192.168.3.0 [1/0] via 192.168.3.9
                    [1/0] via 192.168.3.5
C       192.168.3.4 is directly connected, Serial0/0/0
C       192.168.3.8 is directly connected, Serial0/0/1
```
