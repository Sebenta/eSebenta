# Trabalho prático 8 - OSPF

## Considere o seguinte cenário de rede:

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/5R4L.png" alt="Cenário do protocolo 8"/>
</div>

#### Tem disponíveis as seguintes redes para atribuir aos equipamentos:
- LAN0 e LAN1: 192.168.0.0 /16
- LAN2 e LAN3: 172.16.0.0 /16
- Entre Routers: 10.0.0.0 /24

#### Efetue a divisão em sub-redes, de modo a garantir que cada uma redes pode conter o seguinte número de hosts:
- LAN0: 500 Host
- LAN1: 200 Host
- LAN2: 200 Host
- LAN3: 500 Host

#### Implemente o cenário no simulador e configure os equipamentos. Utilize o OSPF como protocolo de routing.

#### Verifique os seguintes pontos:
- As rotas escolhidas por cada um dos routers é o esperado?
- Verifique a métrica de cada uma das redes.
- O que acontece quando a ligação IPS0 e ISP1 é quebrada?
- Altere a largura de banda (usando o comando clock rate) das linhas entre os routers e verifique como é que o custo das rotas é afetado.
- É possível alterar a informação de largura de banda das ligações de modo a que os routers selecionem uma rota diferente das escolhida inicialmente?

## Divisão em sub-redes
### LANs

|LAN	            |Rede	                            |IPs livres	    |Broadcast	    |Gateway        |
|:--	            |:--	                            |:--    	    |:--    	    |:--            |
|LAN 0 (500 hosts)	|192.168.0.0 /23 |(255.255.254.0)	|1 - .1.254	    |192.168.1.255	|192.168.1.254  |
|LAN 1 (200 hosts)	|192.168.2.0 /24 |(255.255.255.0)	|1 - 254	    |192.168.2.255	|192.168.2.254  |
|LAN 2 (200 hosts)	|172.16.0.0 /24  |(255.255.255.0)	|1 - 254	    |172.16.0.255	|172.16.0.254   |
|LAN 3 (500 hosts)	|172.16.2.0 /23  |(255.255.254.0)	|2.1 - 3.254	|172.16.3.255	|172.16.3.254   |

### Routers links
|Link           |Rede	                            |IPs livres	    |Broadcast	    |Serial         |
|:--            |:--	                            |:--            |:--    	    |:--            |
|ISP 0 - R0	    |10.0.0.0 /30 (255.255.255.252)	    |1 - 2	        |10.0.0.3	    |0/0/0 - 0/0/0  |
|ISP 0 - ISP1	|10.0.0.4 /30 (255.255.255.252)	    |5 - 6	        |10.0.0.7	    |0/0/1 - 0/0/0  |
|ISP 1 - R1	    |10.0.0.8 /30 (255.255.255.252)	    |9 - 10	        |10.0.0.11	    |0/0/1 - 0/0/0  |
|ISP 2 - R0	    |10.0.0.12 /30 (255.255.255.252)	|13 - 14	    |10.0.0.15	    |0/0/0 - 0/0/1  |   
|ISP 2 - R1	    |10.0.0.16 /30 (255.255.255.252)	|17 - 18	    |10.0.0.19	    |0/0/1 - 0/0/1  |

## Configurar os IPs

#### Router ISP 0
```batch
Router>enable
Router#configure terminal
Router(config)#hostname ISP0
ISP0(config)#interface serial 0/0/0
ISP0(config-if)#ip address 10.0.0.1 255.255.255.252
ISP0(config-if)#clock rate 64000
ISP0(config-if)#no shutdown

ISP0(config-if)#interface serial 0/0/1
ISP0(config-if)#ip address 10.0.0.5 255.255.255.252
ISP0(config-if)#clock rate 64000
ISP0(config-if)#no shutdown
ISP0(config-if)#end
```

### Router ISP 1
```batch
Router>ena
Router>enable
Router#configure terminal

Router(config)#hostname ISP1
ISP1(config)#interface serial 0/0/0
ISP1(config-if)#ip address 10.0.0.6 255.255.255.252
ISP1(config-if)#no shutdown

ISP1(config-if)#interface serial 0/0/1
ISP1(config-if)#ip address 10.0.0.9 255.255.255.252
ISP1(config-if)#clock rate 64000
ISP1(config-if)#no shutdown

ISP1(config-if)#end
```

### Router ISP 2
```batch
Router>enable
Router#configure terminal
Router(config)#hostname ISP2
ISP2(config)#interface serial 0/0/0
ISP2(config-if)#ip address 10.0.0.13 255.255.255.252
ISP2(config-if)#clock rate 64000
ISP2(config-if)#no shutdown

ISP2(config-if)#interface serial 0/0/1
ISP2(config-if)#ip address 10.0.0.17 255.255.255.252
ISP2(config-if)#clock rate 64000
ISP2(config-if)#no shutdown

ISP2(config-if)#end
```

### Router R0
```batch
Router> enable
Router# configure terminal
Router(config)# hostname R0

R0(config)# interface serial 0/0/0
R0(config-if)# ip address 10.0.0.2 255.255.255.252
R0(config-if)# no shutdown

R0(config)# interface serial 0/0/1
R0(config-if)# ip address 10.0.0.14 255.255.255.252
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# interface fastEthernet 0/0
R0(config-if)# ip address 192.168.1.254 255.255.254.0
R0(config-if)# no shutdown

R0(config-if)# interface fastEthernet 0/1
R0(config-if)# ip address 192.168.2.254 255.255.255.0
R0(config-if)# no shutdown

R0(config-if)# end
```

### Router R1
```batch
Router> enable
Router# configure terminal
Router(config)# hostname R1

R1(config)# interface serial 0/0/0
R1(config-if)# ip add 10.0.0.10 255.255.255.252
R1(config-if)# no shutdown

R1(config-if)# interface serial 0/0/1
R1(config-if)# ip add 10.0.0.18 255.255.255.252
R1(config-if)# no shutdown

R1(config-if)# exit

R1(config)# interface fastEthernet 0/0
R1(config-if)# ip address 172.16.0.254 255.255.255.0
R1(config-if)# no shutdown

R1(config-if)# interface fastEthernet 0/1
R1(config-if)# ip address 172.16.3.254 255.255.254.0
R1(config-if)# no shutdown

R1(config-if)# end
```

## Configurar protocolo OSPF

### Router R0
```batch
R0# enable
R0# configure terminal

R0(config)# router ospf 100
R0(config-router)# exit

R0(config)# interface serial 0/0/0
R0(config-if)# ip ospf 100 area 0
R0(config-if)# interface serial 0/0/1
R0(config-if)# ip ospf 100 area 0

R0(config-if)# exit

R0(config)# interface fastEthernet 0/0
R0(config-if)# ip ospf 100 area 0
R0(config-if)# interface fastEthernet 0/1
R0(config-if)# ip ospf 100 area 0

R0(config-if)# exit
R0(config)# router ospf 100
R0(config-router)# passive-interface fastEthernet 0/0
R0(config-router)# passive-interface fastEthernet 0/1

R0(config-router)# end
```

### Router R1
```batch
R1> enable
R1# configure terminal

R1(config)# router ospf 100
R1(config-router)# exit

R1(config)# interface serial 0/0/0
R1(config-if)# ip ospf 100 area 0
R1(config-if)# interface serial 0/0/1
R1(config-if)# ip ospf 100 area 0

R1(config-if)# exit

R1(config)# interface fastEthernet 0/0
R1(config-if)# ip ospf 100 area 0
R1(config-if)# interface fastEthernet 0/1
R1(config-if)# ip ospf 100 area 0

R1(config-if)# exit

R1(config)# router ospf 100
R1(config-router)# passive-interface fastEthernet 0/0
R1(config-router)# passive-interface fastEthernet 0/1
R1(config-router)# end
```

### Router ISP 0
```batch
ISP0> enable
ISP0# configure terminal
ISP0(config)# router ospf 100

ISP0(config-router)# exit

ISP0(config)# interface serial 0/0/0
ISP0(config-if)# ip ospf 100 area 0
ISP0(config-if)# interface serial 0/0/1
ISP0(config-if)# ip ospf 100 area 0

ISP0(config-if)# end
```

### Router ISP 1
```batch
ISP1> enable
ISP1# configure terminal
ISP1(config)# router ospf 100
ISP1(config-router)# exit

ISP1(config)# interface serial 0/0/0
ISP1(config-if)# ip ospf 100 area 0
ISP1(config-if)# interface serial 0/0/1
ISP1(config-if)# ip ospf 100 area 0
ISP1(config-if)# end
```

### Router ISP 2
```batch
ISP2> enable
ISP2# configure terminal
ISP2(config)# router ospf 100
ISP2(config-router)# exit

ISP2(config)# interface serial 0/0/0
ISP2(config-if)# ip ospf 100 area 0
ISP2(config-if)# interface serial 0/0/1
ISP2(config-if)# ip ospf 100 area 0
ISP2(config-if)# end
```

## Tabelas de Routing

Usei o comando `show ip route ospf` para ver só as rotas geradas pelo OSPF.

### Router R0
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.4 [110/128] via 10.0.0.1, 02:24:35, Serial0/0/0
O       10.0.0.8 [110/192] via 10.0.0.1, 02:24:21, Serial0/0/0
                 [110/192] via 10.0.0.13, 02:24:21, Serial0/0/1
O       10.0.0.16 [110/128] via 10.0.0.13, 02:24:21, Serial0/0/1
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/129] via 10.0.0.13, 02:24:07, Serial0/0/1
O       172.16.2.0 [110/129] via 10.0.0.13, 02:24:07, Serial0/0/1
```

### Router R1
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.0 [110/192] via 10.0.0.9, 01:56:39, Serial0/0/0
                 [110/192] via 10.0.0.17, 01:56:39, Serial0/0/1
O       10.0.0.4 [110/128] via 10.0.0.9, 02:26:30, Serial0/0/0
O       10.0.0.12 [110/128] via 10.0.0.17, 02:26:30, Serial0/0/1
O    192.168.0.0 [110/129] via 10.0.0.17, 02:26:30, Serial0/0/1
O    192.168.2.0 [110/129] via 10.0.0.17, 02:26:30, Serial0/0/1
```

### Router ISP 0
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.8 [110/128] via 10.0.0.6, 02:25:01, Serial0/0/1
O       10.0.0.12 [110/128] via 10.0.0.2, 02:24:48, Serial0/0/0
O       10.0.0.16 [110/192] via 10.0.0.6, 02:24:48, Serial0/0/1
                  [110/192] via 10.0.0.2, 02:24:48, Serial0/0/0
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/129] via 10.0.0.6, 02:24:34, Serial0/0/1
O       172.16.2.0 [110/129] via 10.0.0.6, 02:24:34, Serial0/0/1
O    192.168.0.0 [110/65] via 10.0.0.2, 02:24:48, Serial0/0/0
O    192.168.2.0 [110/65] via 10.0.0.2, 02:24:48, Serial0/0/0
```

### Router ISP 1
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.0 [110/128] via 10.0.0.5, 02:25:56, Serial0/0/0
O       10.0.0.12 [110/192] via 10.0.0.10, 02:25:43, Serial0/0/1
                  [110/192] via 10.0.0.5, 02:25:43, Serial0/0/0
O       10.0.0.16 [110/128] via 10.0.0.10, 02:25:43, Serial0/0/1
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/65] via 10.0.0.10, 02:25:29, Serial0/0/1
O       172.16.2.0 [110/65] via 10.0.0.10, 02:25:29, Serial0/0/1
O    192.168.0.0 [110/129] via 10.0.0.5, 02:25:43, Serial0/0/0
O    192.168.2.0 [110/129] via 10.0.0.5, 02:25:43, Serial0/0/0
```

### Router ISP 2
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.0 [110/128] via 10.0.0.14, 02:26:02, Serial0/0/0
O       10.0.0.4 [110/192] via 10.0.0.14, 01:56:01, Serial0/0/0
                 [110/192] via 10.0.0.18, 01:56:01, Serial0/0/1
O       10.0.0.8 [110/128] via 10.0.0.18, 02:26:02, Serial0/0/1
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/65] via 10.0.0.18, 02:25:49, Serial0/0/1
O       172.16.2.0 [110/65] via 10.0.0.18, 02:25:49, Serial0/0/1
O    192.168.0.0 [110/65] via 10.0.0.14, 02:26:02, Serial0/0/0
O    192.168.2.0 [110/65] via 10.0.0.14, 02:26:02, Serial0/0/0
```

## Comando `clock rate`
Para realizar analise realizei as alterações no router ISP 2.

```batch
ISP2(config)# interface serial 0/0/0
ISP2(config-if)# clock rate 1200
ISP2(config-if)# interface serial 0/0/1
ISP2(config-if)# clock rate 1200
```

### Tabela de routing de R0 antes das alterações
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.4 [110/128] via 10.0.0.1, 02:24:35, Serial0/0/0
O       10.0.0.8 [110/192] via 10.0.0.1, 02:24:21, Serial0/0/0
                 [110/192] via 10.0.0.13, 02:24:21, Serial0/0/1
O       10.0.0.16 [110/128] via 10.0.0.13, 02:24:21, Serial0/0/1
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/129] via 10.0.0.13, 02:24:07, Serial0/0/1
O       172.16.2.0 [110/129] via 10.0.0.13, 02:24:07, Serial0/0/1
```

### Tabela de routing após a alteração
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.4 [110/128] via 10.0.0.1, 02:29:23, Serial0/0/0
O       10.0.0.8 [110/192] via 10.0.0.1, 02:29:09, Serial0/0/0
                 [110/192] via 10.0.0.13, 02:29:09, Serial0/0/1
O       10.0.0.16 [110/128] via 10.0.0.13, 02:29:09, Serial0/0/1
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/129] via 10.0.0.13, 02:28:55, Serial0/0/1
O       172.16.2.0 [110/129] via 10.0.0.13, 02:28:55, Serial0/0/1
```

> O `clock rate` altera a largura de banda, mas o OSPF não usa essa informação.

## Alterar o valor de referencia
Para alterar o valor de referencia usamos o comando `auto-cost reference-bandwidth "value"`

Vou usar as tabelas de routing do router R0 para realizar a analise.

```batch
ISP2#enable
ISP2#configure
ISP2(config)#router ospf 100
ISP2(config-router)#auto-cost reference-bandwidth ?
  <1-4294967>  The reference bandwidth in terms of Mbits per second
ISP2(config-router)#auto-cost reference-bandwidth 4294967
```

### Tabela de routing `reference-bandwidth 4294967``
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.4 [110/128] via 10.0.0.1, 02:38:27, Serial0/0/0
O       10.0.0.8 [110/192] via 10.0.0.1, 00:00:57, Serial0/0/0
O       10.0.0.16 [110/29266] via 10.0.0.13, 00:00:57, Serial0/0/1 - o custo desparou
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/193] via 10.0.0.1, 00:00:57, Serial0/0/0
O       172.16.2.0 [110/193] via 10.0.0.1, 00:00:57, Serial0/0/0
```

A rota para 172.16.0.0 tinha como via a rede 10.0.0.13, após as alterações a sua via passou a ser a rede 10.0.0.1.

A rota para 10.0.0.16 passou a ter um custo de 29266. 😱

```batch
ISP2(config-router)#auto-cost reference-bandwidth 100
```

### Tabela de routing `reference-bandwidth 100`
```batch
     10.0.0.0/30 is subnetted, 5 subnets
O       10.0.0.4 [110/128] via 10.0.0.1, 02:41:29, Serial0/0/0
O       10.0.0.8 [110/192] via 10.0.0.1, 00:00:03, Serial0/0/0
                 [110/192] via 10.0.0.13, 00:00:03, Serial0/0/1
O       10.0.0.16 [110/128] via 10.0.0.13, 00:00:03, Serial0/0/1
     172.16.0.0/16 is variably subnetted, 2 subnets, 2 masks
O       172.16.0.0 [110/129] via 10.0.0.13, 00:00:03, Serial0/0/1
O       172.16.2.0 [110/129] via 10.0.0.13, 00:00:03, Serial0/0/1
```

De volta ao normal 😄