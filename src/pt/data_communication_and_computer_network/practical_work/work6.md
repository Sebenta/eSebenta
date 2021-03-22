# Trabalho prático 6 - RIP

## Considere o seguinte cenário de rede:

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/5R4L.png" alt="Cenário do protocolo 6"/>
</div>

#### Tem disponíveis as seguintes redes para atribuir aos equipamentos:
- LAN 0 e LAN 1: 192.168.0.0/16
- LAN 2 e LAN 3: 172.16.0.0/16
- ligações entre routers: 10.0.0.0/24

#### Efetue a divisão em sub-redes, de modo a garantir que cada umas das redes pode conter o seguinte número de hosts:
- LAN 0: 120hosts
- LAN 1: 200hosts
- LAN 2: 64hosts
- LAN 3: 120hosts

#### Implemente o cenário no simulador e configure os equipamentos. Utilize o RIP como protocolo de routing.

#### Verifique os seguintes pontos:
- As rotas escolhidas por cada um routers é o esperado?
- Verifique a métrica de cada uma das redes.
- O que acontece quando a ligação entre ISP0 e IPS1 é quebrada?

## Divisão em sub-redes

### Redes
|LAN	            |Rede	            |IPs livres	|Broadcast	    |Gateway        |
|      :--	        |   :--	            |   :-- 	| :--   	    |   :--         |
|LAN 0 (120 hosts)	|192.168.0.0 /25	|1 - 126	|192.168.0.127	|192.168.0.126  |
|LAN 1 (200 hosts)	|192.168.1.0 /24	|1 - 254	|192.168.1.255	|192.168.1.254  |
|LAN 2 (64 hosts)	|172.16.0.0 /25	    |1 - 126	|171.16.0.127	|172.16.0.126   |
|LAN 3 (120 hosts)	|172.16.0.128 /25	|129 - 254	|171.16.0.255	|172.16.0.254   |

### Routers links
|Link	        |Rede	        |IPs livres	    |Broadcast	|Serial         |
|   :--	        |   :--         |   :--         |   :--	    |   :--         |
|ISP 0 - R0	    |10.0.0.0 /30	|1 - 2	        |10.0.0.3	|0/0/0 - 0/0/0  |
|ISP 0 - ISP 1	|10.0.0.4 /30	|5 - 6	        |10.0.0.7	|0/0/1 - 0/0/0  |
|ISP 1 - R1	    |10.0.0.8 /30	|9 - 10	        |10.0.0.11	|0/0/1 - 0/0/0  |
|ISP 2 - R0 	|10.0.0.12 /30	|13 - 14	    |10.0.0.15	|0/0/0 - 0/0/1  |
|ISP 2 - R0 	|10.0.0.16 /30	|17 - 18	    |10.0.0.19	|0/0/1 - 0/0/1  |

## Configurar os IPs
#### Router ISP0
```batch
Router> enable
Router# configure terminal
Router(config)# hostname ISP0

ISP0(config)# interface serial 0/0/0
ISP0(config-if)# ip address 10.0.0.1 255.255.255.252
ISP0(config-if)# clock rate 64000
ISP0(config-if)# no shutdown

ISP0(config)# interface serial 0/0/1
ISP0(config-if)# ip address 10.0.0.5 255.255.255.252
ISP0(config-if)# clock rate 64000
ISP0(config-if)# no shutdown
ISP0(config-if)# end

ISP0# copy running-config startup-config
```

#### Router ISP1
```batch
Router> enable
Router# configure terminal
Router(config)# hostname ISP1

ISP1(config)# interface serial 0/0/0
ISP1(config-if)# ip address 10.0.0.6 255.255.255.252
ISP1(config-if)# no shutdown

ISP1(config)# interface serial 0/0/1
ISP1(config-if)# ip address 10.0.0.9 255.255.255.252
ISP1(config-if)# clock rate 64000
ISP1(config-if)# no shutdown
ISP1(config-if)# end

ISP1# copy running-config startup-config
```

#### Router ISP2
```batch
Router> enable
Router# configure terminal
Router(config)# hostname ISP2

ISP2(config)# interface serial 0/0/0
ISP2(config-if)# ip address 10.0.0.13 255.255.255.252
ISP2(config-if)# clock rate 64000
ISP2(config-if)# no shutdown

ISP2(config)# interface serial 0/0/1
ISP2(config-if)# ip address 10.0.0.17 255.255.255.252
ISP2(config-if)# clock rate 64000
ISP2(config-if)# no shutdown
ISP2(config-if)# end

ISP2# copy running-config startup-config
```

#### Router R0
```batch
Router> enable
Router# configure terminal
Router(config)# hostname R0

R0(config)# interface fastEthernet 0/0
R0(config-if)# ip address 192.168.0.126 255.255.255.128
R0(config-if)# no shutdown

R0(config)# interface fastEthernet 0/1
R0(config-if)# ip address 192.168.1.254 255.255.255.0
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# interface serial 0/0/0
R0(config-if)# ip address 10.0.0.2 255.255.255.252
R0(config-if)# no shutdown

R0(config)# interface serial 0/0/1
R0(config-if)# ip address 10.0.0.14 255.255.255.252
R0(config-if)# no shutdown
R0(config-if)# end

R0# copy running-config startup-config
```

#### Router R1
```batch
Router> enable
Router# configure terminal
Router(config)# hostname R1

R1(config)# interface fastEthernet 0/0
R1(config-if)# ip address 172.16.0.126 255.255.255.128
R1(config-if)# no shutdown

R1(config)# interface fastEthernet 0/1
R1(config-if)# ip address 172.16.0.254 255.255.255.128
R1(config-if)# no shutdown

R1(config-if)# exit

R1(config)# interface serial 0/0/0
R1(config-if)# ip address 10.0.0.10 255.255.255.252
R1(config-if)# no shutdown

R1(config)# interface serial 0/0/1
R1(config-if)# ip address 10.0.0.14 255.255.255.252
R1(config-if)# no shutdown
R1(config-if)# end

R1# copy running-config startup-config
```

## Configurar protocolo RIP v2

#### Router ISP0
```batch
ISP0#configure terminal
ISP0(config)# router rip
ISP0(config-router)# version 2
ISP0(config-router)# net 10.0.0.0
ISP0(config-router)# network 10.0.0.0
ISP0(config-router)# network 10.0.0.4
ISP0(config-router)# end
ISP0# wr
```

#### Router ISP1
```batch
ISP1# configure terminal
ISP1(config)# router rip
ISP1(config-router)# version 2
ISP1(config-router)# network 10.0.0.4
ISP1(config-router)# network 10.0.0.8
ISP1(config-router)# end
ISP1# wr
```
#### Router ISP2
```batch
ISP2# configure terminal
ISP2(config)# router rip
ISP2(config-router)# version 2
ISP2(config-router)# network 10.0.0.12
ISP2(config-router)# network 10.0.0.16
ISP2(config-router)# end
ISP2# wr
```

#### Router R0
```batch
R0# configure terminal
R0(config)# router rip
R0(config-router)# version 2
R0(config-router)# network 192.168.0.0
R0(config-router)# network 192.168.1.0
R0(config-router)# network 10.0.0.0
R0(config-router)# network 10.0.0.12
R0(config-router)# passive-interface fastEthernet 0/0
R0(config-router)# passive-interface fastEthernet 0/1
R0(config-router)# end
R0# wr
```

#### Router R1
```batch
R1# configure terminal
R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# network 172.16.0.0
R1(config-router)# network 172.16.0.128
R1(config-router)# network 10.0.0.8
R1(config-router)# network 10.0.0.16
R1(config-router)# passive-interface fastEthernet 0/0
R1(config-router)# passive-interface fastEthernet 0/1
R1(config-router)# end
R1# wr
```

## Tabelas de routing
```batch
show ip route
```

#### Router R0
```batch
     10.0.0.0/30 is subnetted, 5 subnets
C       10.0.0.0 is directly connected, Serial0/0/0
R       10.0.0.4 [120/1] via 10.0.0.1, 00:00:21, Serial0/0/0
R       10.0.0.8 [120/2] via 10.0.0.1, 00:00:21, Serial0/0/0
                 [120/2] via 10.0.0.13, 00:00:16, Serial0/0/1
C       10.0.0.12 is directly connected, Serial0/0/1
R       10.0.0.16 [120/1] via 10.0.0.13, 00:00:16, Serial0/0/1
R    172.16.0.0/16 [120/2] via 10.0.0.13, 00:00:16, Serial0/0/1
     192.168.0.0/25 is subnetted, 1 subnets
C       192.168.0.0 is directly connected, FastEthernet0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/1
```

#### Router R1
```batch
     10.0.0.0/30 is subnetted, 5 subnets
R       10.0.0.0 [120/2] via 10.0.0.9, 00:00:20, Serial0/0/0
                 [120/2] via 10.0.0.17, 00:00:17, Serial0/0/1
R       10.0.0.4 [120/1] via 10.0.0.9, 00:00:20, Serial0/0/0
C       10.0.0.8 is directly connected, Serial0/0/0
R       10.0.0.12 [120/1] via 10.0.0.17, 00:00:17, Serial0/0/1
C       10.0.0.16 is directly connected, Serial0/0/1
     172.16.0.0/25 is subnetted, 2 subnets
C       172.16.0.0 is directly connected, FastEthernet0/0
C       172.16.0.128 is directly connected, FastEthernet0/1
R    192.168.0.0/24 [120/2] via 10.0.0.17, 00:00:17, Serial0/0/1
R    192.168.1.0/24 [120/2] via 10.0.0.17, 00:00:17, Serial0/0/1
```

#### Router ISP0
```batch
     10.0.0.0/30 is subnetted, 5 subnets
C       10.0.0.0 is directly connected, Serial0/0/0
C       10.0.0.4 is directly connected, Serial0/0/1
R       10.0.0.8 [120/1] via 10.0.0.6, 00:00:18, Serial0/0/1
R       10.0.0.12 [120/1] via 10.0.0.2, 00:00:07, Serial0/0/0
R       10.0.0.16 [120/2] via 10.0.0.2, 00:00:07, Serial0/0/0
                  [120/2] via 10.0.0.6, 00:00:18, Serial0/0/1
R    172.16.0.0/16 [120/2] via 10.0.0.6, 00:00:18, Serial0/0/1
R    192.168.0.0/24 [120/1] via 10.0.0.2, 00:00:07, Serial0/0/0
R    192.168.1.0/24 [120/1] via 10.0.0.2, 00:00:07, Serial0/0/0
```

#### Router ISP1
```batch
     10.0.0.0/30 is subnetted, 5 subnets
R       10.0.0.0 [120/1] via 10.0.0.5, 00:00:16, Serial0/0/0
C       10.0.0.4 is directly connected, Serial0/0/0
C       10.0.0.8 is directly connected, Serial0/0/1
R       10.0.0.12 [120/2] via 10.0.0.10, 00:00:09, Serial0/0/1
                  [120/2] via 10.0.0.5, 00:00:16, Serial0/0/0
R       10.0.0.16 [120/1] via 10.0.0.10, 00:00:09, Serial0/0/1
R    172.16.0.0/16 [120/1] via 10.0.0.10, 00:00:09, Serial0/0/1
R    192.168.0.0/24 [120/2] via 10.0.0.5, 00:00:16, Serial0/0/0
R    192.168.1.0/24 [120/2] via 10.0.0.5, 00:00:16, Serial0/0/0
```

#### Router ISP2
```batch
     10.0.0.0/30 is subnetted, 5 subnets
R       10.0.0.0 [120/1] via 10.0.0.14, 00:00:13, Serial0/0/0
R       10.0.0.4 [120/2] via 10.0.0.18, 00:00:22, Serial0/0/1
                 [120/2] via 10.0.0.14, 00:00:13, Serial0/0/0
R       10.0.0.8 [120/1] via 10.0.0.18, 00:00:22, Serial0/0/1
C       10.0.0.12 is directly connected, Serial0/0/0
C       10.0.0.16 is directly connected, Serial0/0/1
R    172.16.0.0/16 [120/1] via 10.0.0.18, 00:00:22, Serial0/0/1
R    192.168.0.0/24 [120/1] via 10.0.0.14, 00:00:13, Serial0/0/0
R    192.168.1.0/24 [120/1] via 10.0.0.14, 00:00:13, Serial0/0/0
```

## Tabelas de routing (sem conexão entre ISP0 e ISP1)

#### Router R0
```batch
     10.0.0.0/30 is subnetted, 5 subnets
C       10.0.0.0 is directly connected, Serial0/0/0
R       10.0.0.4 is possibly down, routing via 10.0.0.1, Serial0/0/0
R       10.0.0.8 [120/2] via 10.0.0.13, 00:00:15, Serial0/0/1
C       10.0.0.12 is directly connected, Serial0/0/1
R       10.0.0.16 [120/1] via 10.0.0.13, 00:00:15, Serial0/0/1
R    172.16.0.0/16 [120/2] via 10.0.0.13, 00:00:15, Serial0/0/1
     192.168.0.0/25 is subnetted, 1 subnets
C       192.168.0.0 is directly connected, FastEthernet0/0
C    192.168.1.0/24 is directly connected, FastEthernet0/1
```

#### Router R1
```batch
     10.0.0.0/30 is subnetted, 5 subnets
R       10.0.0.0 [120/2] via 10.0.0.17, 00:00:06, Serial0/0/1
R       10.0.0.4 is possibly down, routing via 10.0.0.9, Serial0/0/0
C       10.0.0.8 is directly connected, Serial0/0/0
R       10.0.0.12 [120/1] via 10.0.0.17, 00:00:06, Serial0/0/1
C       10.0.0.16 is directly connected, Serial0/0/1
     172.16.0.0/25 is subnetted, 2 subnets
C       172.16.0.0 is directly connected, FastEthernet0/0
C       172.16.0.128 is directly connected, FastEthernet0/1
R    192.168.0.0/24 [120/2] via 10.0.0.17, 00:00:06, Serial0/0/1
R    192.168.1.0/24 [120/2] via 10.0.0.17, 00:00:06, Serial0/0/1
```

#### Router ISP0
```batch
     10.0.0.0/30 is subnetted, 4 subnets
C       10.0.0.0 is directly connected, Serial0/0/0
R       10.0.0.8 [120/3] via 10.0.0.2, 00:00:27, Serial0/0/0
R       10.0.0.12 [120/1] via 10.0.0.2, 00:00:27, Serial0/0/0
R       10.0.0.16 [120/2] via 10.0.0.2, 00:00:27, Serial0/0/0
R    172.16.0.0/16 [120/3] via 10.0.0.2, 00:00:27, Serial0/0/0
R    192.168.0.0/24 [120/1] via 10.0.0.2, 00:00:27, Serial0/0/0
R    192.168.1.0/24 [120/1] via 10.0.0.2, 00:00:27, Serial0/0/0
```

#### Router ISP1
```batch
     10.0.0.0/30 is subnetted, 4 subnets
R       10.0.0.0 [120/3] via 10.0.0.10, 00:00:21, Serial0/0/1
C       10.0.0.8 is directly connected, Serial0/0/1
R       10.0.0.12 [120/2] via 10.0.0.10, 00:00:21, Serial0/0/1
R       10.0.0.16 [120/1] via 10.0.0.10, 00:00:21, Serial0/0/1
R    172.16.0.0/16 [120/1] via 10.0.0.10, 00:00:21, Serial0/0/1
R    192.168.0.0/24 [120/3] via 10.0.0.10, 00:00:21, Serial0/0/1
R    192.168.1.0/24 [120/3] via 10.0.0.10, 00:00:21, Serial0/0/1
```

#### Router ISP2
```batch
     10.0.0.0/30 is subnetted, 5 subnets
R       10.0.0.0 [120/1] via 10.0.0.14, 00:00:21, Serial0/0/0
R       10.0.0.4 is possibly down, routing via 10.0.0.14, Serial0/0/0
R       10.0.0.8 [120/1] via 10.0.0.18, 00:00:19, Serial0/0/1
C       10.0.0.12 is directly connected, Serial0/0/0
C       10.0.0.16 is directly connected, Serial0/0/1
R    172.16.0.0/16 [120/1] via 10.0.0.18, 00:00:19, Serial0/0/1
R    192.168.0.0/24 [120/1] via 10.0.0.14, 00:00:21, Serial0/0/0
R    192.168.1.0/24 [120/1] via 10.0.0.14, 00:00:21, Serial0/0/0
```