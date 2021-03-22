# Trabalho prático 7 - OSPF

## Considere o seguinte cenário de rede:

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/3R2C3L.png" alt="Cenário do protocolo 7.1"/>
</div>

Considere que dispões da fede 192.168.0.0/16 para atribuir às redes locais e a rede 10.1.1.0/24 para atribuir à ligações entre os routers. Cada uma redes locais derá suportar 200 hosts ligados.

Implemente o cenário no simulador e configure os equipamentos.

## Divisão em sub-redes

### Redes
|LAN	            |Rede	            |IPs livres |Broadcast	    |Gateway        |
|   :--	            |   :--	            |   :-- 	|   :--         |   :--         |
|LAN 0 (200 hosts)	|192.168.0.0 /24	|1 - 254	|192.168.0.255	|192.168.0.254  |
|LAN 1 (200 hosts)	|192.168.1.0 /24	|1 - 254	|192.168.1.255	|192.168.1.254  |
|LAN 2 (200 hosts)	|192.168.2.0 /24	|1 - 254	|192.168.2.255	|192.168.2.254  |

### Routers links
|Link	    |Rede	        |IPs livres	    |Broadcast	    |Serial         |
|   :--	    |   :--	        |   :-- 	    |   :--         |   :--         |
|R0 - R1	|10.1.1.0 /30	|1 - 2	        |10.1.1.3	    |0/0/0 - 0/0/0  |
|R1 - R2	|10.1.1.4 /30	|5 - 6	        |10.1.1.7	    |0/0/1 - 0/0/0  |
|R0 - R2	|10.1.1.8 /30	|9 - 10	        |10.1.1.11	    |0/0/1 - 0/0/1  |

## Primeira Implementação
### Configurar os IPs

#### Router R0
```batch
Router> enable
Router# configure terminal
Router(config)# hostname R0

R0(config)# interface fastEthernet 0/0
R0(config-if)#ip address 192.168.0.254 255.255.255.0
R0(config-if)#no shutdown

R0(config-if)#exit

R0(config)#interface serial 0/0/0
R0(config-if)#ip address 10.1.1.1 255.255.255.252
R0(config-if)#clock rate 64000
R0(config-if)#no shutdown
R0(config-if)#end
````

#### Router R1
```batch
Router>enable
Router#configure terminal
Router(config)#hostname R1

R1(config)#interface fastEthernet 0/0
R1(config-if)#ip address 192.168.1.254 255.255.255.0
R1(config-if)#no shutdown

R1(config-if)#exit

R1(config)#interface serial 0/0/0
R1(config-if)#ip address 10.1.1.2 255.255.255.252
R1(config-if)#no shutdown

R1(config-if)#interface serial 0/0/1
R1(config-if)#ip address 10.1.1.5 255.255.255.252
R1(config-if)#clock rate 64000
R1(config-if)#no shutdown
R1(config-if)#end
```

#### Router R2
```batch
Router>enable
Router#configure terminal
Router(config)#hostname R2

R2(config)#interface fastEthernet 0/0
R2(config-if)#ip address 192.168.2.254 255.255.255.0
R2(config-if)#no shutdown

R2(config-if)#exit

R2(config)#interface serial 0/0/0
R2(config-if)#ip address 10.1.1.6 255.255.255.252
R2(config-if)#no shutdown
R2(config-if)#end
```

### Configurar o protocolo OSPF

#### Router R0
```batch
R0# enable
R0# configure terminal

R0(config)# router ospf 1
R0(config-router)# network 192.168.0.0 0.0.0.255 area 0
R0(config-router)# network 10.1.1.0 0.0.0.255 area 0
R0(config-router)# passive-interface fastEthernet 0/0
R0(config-router)# end
```

#### Router R1
```batch
R1> enable
R1# configure terminal

R1(config)# router ospf 1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 10.1.1.0 0.0.0.255 area 0
R1(config-router)# network 10.1.1.4 0.0.0.255 area 0
R1(config-router)# passive-interface fastEthernet 0/0
R1(config-router)# end
```

#### Router R2
```batch
R2> enable
R2# configure terminal

R2(config)# router ospf 1
R2(config-router)# network 192.168.2.0 0.0.0.255 area 0
R2(config-router)# network 10.1.1.4 0.0.0.255 area 0
R2(config-router)# passive-interface fastEthernet 0/0
R2(config-router)# end
```

### Tabelas de routing

#### Router R0
```batch
     10.0.0.0/30 is subnetted, 2 subnets
C       10.1.1.0 is directly connected, Serial0/0/0
O       10.1.1.4 [110/128] via 10.1.1.2, 00:08:17, Serial0/0/0
C    192.168.0.0/24 is directly connected, FastEthernet0/0
O    192.168.1.0/24 [110/65] via 10.1.1.2, 00:08:17, Serial0/0/0
O    192.168.2.0/24 [110/129] via 10.1.1.2, 00:05:03, Serial0/0/0
```

#### Router R1
```batch
    10.0.0.0/30 is subnetted, 2 subnets
C       10.1.1.0 is directly connected, Serial0/0/0
C       10.1.1.4 is directly connected, Serial0/0/1
O    192.168.0.0/24 [110/65] via 10.1.1.1, 00:08:57, Serial0/0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/0
O    192.168.2.0/24 [110/65] via 10.1.1.6, 00:05:57, Serial0/0/1
```

#### Router R2
```batch
     10.0.0.0/30 is subnetted, 2 subnets
O       10.1.1.0 [110/128] via 10.1.1.5, 00:06:23, Serial0/0/0
C       10.1.1.4 is directly connected, Serial0/0/0
O    192.168.0.0/24 [110/129] via 10.1.1.5, 00:06:23, Serial0/0/0
O    192.168.1.0/24 [110/65] via 10.1.1.5, 00:06:23, Serial0/0/0
C    192.168.2.0/24 is directly connected, FastEthernet0/0
```

### Adicionar RIP default route no router R1

#### Router R1
```batch
R1#enable
R1#configure terminal

R1(config)#router rip

R1(config-router)#version 2
R1(config-router)#default-information originate
R1(config-router)#end
```

### Tabelas de routing após o RIP Default Route

#### Router R0
```batch
     10.0.0.0/30 is subnetted, 2 subnets
C       10.1.1.0 is directly connected, Serial0/0/0
O       10.1.1.4 [110/128] via 10.1.1.2, 00:12:02, Serial0/0/0
C    192.168.0.0/24 is directly connected, FastEthernet0/0
O    192.168.1.0/24 [110/65] via 10.1.1.2, 00:12:02, Serial0/0/0
O    192.168.2.0/24 [110/129] via 10.1.1.2, 00:08:48, Serial0/0/0
```

#### Router R1
```batch
     10.0.0.0/30 is subnetted, 2 subnets
C       10.1.1.0 is directly connected, Serial0/0/0
C       10.1.1.4 is directly connected, Serial0/0/1
O    192.168.0.0/24 [110/65] via 10.1.1.1, 00:13:26, Serial0/0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/0
O    192.168.2.0/24 [110/65] via 10.1.1.6, 00:10:26, Serial0/0/1
```

#### Router R2
```batch
     10.0.0.0/30 is subnetted, 2 subnets
O       10.1.1.0 [110/128] via 10.1.1.5, 00:09:28, Serial0/0/0
C       10.1.1.4 is directly connected, Serial0/0/0
O    192.168.0.0/24 [110/129] via 10.1.1.5, 00:09:28, Serial0/0/0
O    192.168.1.0/24 [110/65] via 10.1.1.5, 00:09:28, Serial0/0/0
C    192.168.2.0/24 is directly connected, FastEthernet0/0
```

## Segunda parte do trabalho

### Considere o seguinte cenário de rede:
<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/3R3C3L.png" alt="Cenário do protocolo 7.2"/>
</div>

### Alterações necessárias

#### Router R0
```batch
R0# enable
R0# configure terminal

R0(config)# interface serial 0/0/1
R0(config-if)# ip address 10.1.1.9 255.255.255.252
R0(config-if)# clock rate 64000
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# router ospf 1
R0(config-router)# network 10.1.1.8 0.0.0.255 area 0
R0(config-router)# end
```

#### Router R2
```batch
R2# enable
R2# configure terminal

R2(config)# interface serial 0/0/1
R2(config-if)# ip address 10.1.1.10 255.255.255.252
R2(config-if)# no shutdown

R2(config-if)# exit

R2(config)# router ospf 1
R2(config-router)# network 10.1.1.8 0.0.0.255 area 0
R2(config-router)# end
```

### Tabelas de routing

#### Rotas R0
```batch
     10.0.0.0/30 is subnetted, 3 subnets
C       10.1.1.0 is directly connected, Serial0/0/0
O       10.1.1.4 [110/128] via 10.1.1.2, 00:00:42, Serial0/0/0
                 [110/128] via 10.1.1.10, 00:00:42, Serial0/0/1
C       10.1.1.8 is directly connected, Serial0/0/1
C    192.168.0.0/24 is directly connected, FastEthernet0/0
O    192.168.1.0/24 [110/65] via 10.1.1.2, 00:22:43, Serial0/0/0
O    192.168.2.0/24 [110/65] via 10.1.1.10, 00:00:42, Serial0/0/1
```

#### Rotas R1
```batch
     10.0.0.0/30 is subnetted, 3 subnets
C       10.1.1.0 is directly connected, Serial0/0/0
C       10.1.1.4 is directly connected, Serial0/0/1
O       10.1.1.8 [110/128] via 10.1.1.1, 00:02:06, Serial0/0/0
                 [110/128] via 10.1.1.6, 00:02:06, Serial0/0/1
O    192.168.0.0/24 [110/65] via 10.1.1.1, 00:23:59, Serial0/0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/0
O    192.168.2.0/24 [110/65] via 10.1.1.6, 00:20:59, Serial0/0/1
```

#### Rotas R2
```batch
     10.0.0.0/30 is subnetted, 3 subnets
O       10.1.1.0 [110/128] via 10.1.1.5, 00:02:43, Serial0/0/0
                 [110/128] via 10.1.1.9, 00:02:43, Serial0/0/1
C       10.1.1.4 is directly connected, Serial0/0/0
C       10.1.1.8 is directly connected, Serial0/0/1
O    192.168.0.0/24 [110/65] via 10.1.1.9, 00:02:43, Serial0/0/1
O    192.168.1.0/24 [110/65] via 10.1.1.5, 00:21:30, Serial0/0/0
C    192.168.2.0/24 is directly connected, FastEthernet0/0
```