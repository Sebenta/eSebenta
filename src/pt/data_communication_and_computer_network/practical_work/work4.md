# Trabalho prático 4 - Default Routing

## Considere o seguinte cenário de rede:

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/practical/3R2C3L.png" alt="Cenário do protocolo 4"/>
</div>

> Considere que dispõe das redes 192.168.0.0/24 e 192.168.1.0/24 para atribuir aos equipamentos, utilizando sub-redes de tamanho apropriado, de modo a que cada uma das redes locais possa albergar até 63 hosts + 1 Router.

### Defina as redes que vai usar
- Rede 0: 192.168.0.0 - 255.255.255.128 (/25)
- Rede 1: 192.168.0.128 - 255.255.255.128 (/25)
- Rede 2: 192.168.1.0 - 255.255.255.128 (/25)
- Router 0  Router 1: 192.168.1.128 - 255.255.255.252 (/30)
- Router 1  Router 2: 192.168.1.132 - 255.255.255.252 (/30)

>Realize duas implementações do cenário e teste a conectividade entre os diferentes equipamentos:
>
> Na primeira implementação não use rotas por defeito
>
> Na segunda implementação use rotas por defeito, sempre que possível

## Primeira implementação
#### Router R0
```batch
Router> enable
Router# configure terminal

Router(config)#hostname R0

R0(config)# interface fastEthernet 0/0
R0(config-if)# ip address 192.168.0.126 255.255.255.128
R0(config-if)# no shutdown

R0(config-if)# exit

R0(config)# interface serial 0/0/0
R0(config-if)# ip address 192.168.1.129 255.255.255.252
R0(config-if)# clock rate 64000
R0(config-if)# no shutdown

R0(config-if)# do show ip interface brief
```

##### Resultado:
```batch
Interface              IP-Address      OK? Method Status                Protocol
FastEthernet0/0        192.168.0.254   YES manual up                    up
FastEthernet0/1        unassigned      YES unset  administratively down down
Serial0/0/0            192.168.1.129   YES manual down                  down
Serial0/0/1            unassigned      YES unset  administratively down down
Vlan1                  unassigned      YES unset  administratively down down
```

#### Router R1
```batch
Router> enable
Router# configure terminal

Router(config)# hostname R1

R1(config)# interface fastEthernet 0/0
Router(config-if)# ip address 192.168.0.126 255.255.255.128
R1(config-if)# no shutdown

R1(config-if)# exit

R1(config)# interface serial 0/0/0
R1(config-if)# ip address 192.168.1.130 255.255.255.252
R1(config-if)#no shutdown

R1(config-if)# exit

R1(config)# interface serial 0/0/1
R1(config-if)# ip address 192.168.1.133 255.255.255.252
R1(config-if)# clock rate 64000
R1(config-if)# no shutdown

R1(config-if)# do show ip interface brief
```

##### Resultado:
```batch
Interface              IP-Address      OK? Method Status                Protocol
FastEthernet0/0        192.168.0.129   YES manual up                    up
FastEthernet0/1        unassigned      YES unset  administratively down down
Serial0/0/0            192.168.1.130   YES manual up                    up
Serial0/0/1            192.168.1.133   YES manual down                  down
Vlan1                  unassigned      YES unset  administratively down down
```

#### Router R2
```batch
Router> enable
Router# configure terminal

Router(config)# hostname R2

R2(config)# interface fastEthernet 0/0
R2(config-if)# ip address 192.168.1.126 255.255.255.128
R2(config-if)# no shutdown

R2(config-if)# exit

R2(config)# interface serial 0/0/0
R2(config-if)# ip address 192.168.1.134 255.255.255.252
R2(config-if)# no shutdown

R2(config-if)# do show ip interface brief
```

##### Resultado:
```batch
Interface              IP-Address      OK? Method Status                Protocol
FastEthernet0/0        192.168.1.126   YES manual up                    up
FastEthernet0/1        unassigned      YES unset  administratively down down
Serial0/0/0            192.168.1.134   YES manual up                    up
Serial0/0/1            unassigned      YES unset  administratively down down
Vlan1                  unassigned      YES unset  administratively down down
```

### Configurar as rotas

#### Router RO
```batch
R0(config)# ip route 192.168.0.128 255.255.255.128 192.168.1.130
R0(config)# ip route 192.168.1.0 255.255.255.128 192.168.1.130
R0(config)# ip route 192.168.1.132 255.255.255.252 192.168.1.130
R0(config)# do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 2 subnets
C       192.168.0.0 is directly connected, FastEthernet0/0
S       192.168.0.128 [1/0] via 192.168.1.130
     192.168.1.0/24 is variably subnetted, 3 subnets, 2 masks
S       192.168.1.0/25 [1/0] via 192.168.1.130
C       192.168.1.128/30 is directly connected, Serial0/0/0
S       192.168.1.132/30 [1/0] via 192.168.1.130
```

#### Router R1
```batch
R1(config)# ip route 192.168.0.0 255.255.255.128 192.168.1.129
R1(config)# ip route 192.168.1.0 255.255.255.128 192.168.1.134
R1(config)#do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 2 subnets
S       192.168.0.0 [1/0] via 192.168.1.129
C       192.168.0.128 is directly connected, FastEthernet0/0
     192.168.1.0/24 is variably subnetted, 3 subnets, 2 masks
S       192.168.1.0/25 [1/0] via 192.168.1.134
C       192.168.1.128/30 is directly connected, Serial0/0/0
C       192.168.1.132/30 is directly connected, Serial0/0/1
```

#### Router R2
```batch
R2(config)#ip route 192.168.0.0 255.255.255.128 192.168.1.133
R2(config)#ip route 192.168.0.128 255.255.255.128 192.168.1.133
R2(config)#ip route 192.168.1.128 255.255.255.252 192.168.1.133
R2(config)#do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 2 subnets
S       192.168.0.0 [1/0] via 192.168.1.133
S       192.168.0.128 [1/0] via 192.168.1.133
     192.168.1.0/24 is variably subnetted, 3 subnets, 2 masks
C       192.168.1.0/25 is directly connected, FastEthernet0/0
S       192.168.1.128/30 [1/0] via 192.168.1.133
C       192.168.1.132/30 is directly connected, Serial0/0/0
```

### Verifique a conetividade entre as redes utilizando o comando ping
`PC0 como exemplo`

__PC0  $\to$ PC2__
```batch
C:\>ping 192.168.0.129
```

##### Resultado:
```batch
Pinging 192.168.0.129 with 32 bytes of data:

Request timed out.
Reply from 192.168.0.129: bytes=32 time=226ms TTL=126
Reply from 192.168.0.129: bytes=32 time=61ms TTL=126
Reply from 192.168.0.129: bytes=32 time=2ms TTL=126

Ping statistics for 192.168.0.129:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 226ms, Average = 96ms
```

__PC0 $\to$ PC4__
```batch
C:\>ping 192.168.1.1
```

##### Resultado:
```batch
Pinging 192.168.1.1 with 32 bytes of data:

Request timed out.
Reply from 192.168.1.1: bytes=32 time=3ms TTL=125
Reply from 192.168.1.1: bytes=32 time=2ms TTL=125
Reply from 192.168.1.1: bytes=32 time=2ms TTL=125

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 3ms, Average = 2ms
```

__PC0 $\to$ R1 Serial 0/0/0__
```batch
C:\>ping 192.168.1.130
```

##### Resultado:
```batch
Pinging 192.168.1.130 with 32 bytes of data:

Reply from 192.168.1.130: bytes=32 time=4ms TTL=254
Reply from 192.168.1.130: bytes=32 time=2ms TTL=254
Reply from 192.168.1.130: bytes=32 time=1ms TTL=254
Reply from 192.168.1.130: bytes=32 time=1ms TTL=254

Ping statistics for 192.168.1.130:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 4ms, Average = 2ms
```

__PC0 $\to$ R1 Serial 0/0/1__
```batch
C:\>ping 192.168.1.133
```

##### Resultado:
```batch
Pinging 192.168.1.133 with 32 bytes of data:

Reply from 192.168.1.133: bytes=32 time=1ms TTL=254
Reply from 192.168.1.133: bytes=32 time=6ms TTL=254
Reply from 192.168.1.133: bytes=32 time=1ms TTL=254
Reply from 192.168.1.133: bytes=32 time=1ms TTL=254

Ping statistics for 192.168.1.133:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 6ms, Average = 2ms
```

__PC0 $\to$ R2 Serial 0/0/0__
```batch
C:\>ping 192.168.1.134
```

##### Resultado:
```batch
Pinging 192.168.1.134 with 32 bytes of data:

Reply from 192.168.1.134: bytes=32 time=24ms TTL=253
Reply from 192.168.1.134: bytes=32 time=2ms TTL=253
Reply from 192.168.1.134: bytes=32 time=9ms TTL=253
Reply from 192.168.1.134: bytes=32 time=10ms TTL=253

Ping statistics for 192.168.1.134:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 24ms, Average = 11ms
```

## Segunda implementação

### Apagar todas as rotas dispensáveis

#### Router R0
```batch
R0> enable

R0# show ip route  

R0# configure terminal

R0(config)# no ip route 192.168.0.128 255.255.255.128 192.168.1.130
R0(config)# no ip route 192.168.1.0 255.255.255.128 192.168.1.130
R0(config)# no ip route 192.168.1.132 255.255.255.252 192.168.1.130

R0(config)# do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 1 subnets
C       192.168.0.0 is directly connected, FastEthernet0/0
     192.168.1.0/30 is subnetted, 1 subnets
C       192.168.1.128 is directly connected, Serial0/0/0
```

### Router R1
```batch
R1> enable
R1# configure terminal
R1(config)# do show ip route
R1(config)# no ip route 192.168.0.0 255.255.255.128 192.168.1.129
R1(config)# do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 1 subnets
C       192.168.0.128 is directly connected, FastEthernet0/0
     192.168.1.0/24 is variably subnetted, 3 subnets, 2 masks
S       192.168.1.0/25 [1/0] via 192.168.1.134
C       192.168.1.128/30 is directly connected, Serial0/0/0
C       192.168.1.132/30 is directly connected, Serial0/0/1
```

### Router 2
```batch
R2> enable

R2# configure terminal

R2(config)# do show ip route

R2(config)# no ip route 192.168.0.0 255.255.255.128 192.168.1.133
R2(config)# no ip route 192.168.0.128 255.255.255.128 192.168.1.133
R2(config)# no ip route 192.168.1.128 255.255.255.252 192.168.1.133

R2(config)# do show ip route
```

##### Resultado:
```batch
     192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.1.0/25 is directly connected, FastEthernet0/0
C       192.168.1.132/30 is directly connected, Serial0/0/0
```

### Definir a novas rotas

#### Router 0
```batch
R0(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.130
R0(config)# do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 1 subnets
C       192.168.0.0 is directly connected, FastEthernet0/0
     192.168.1.0/30 is subnetted, 1 subnets
C       192.168.1.128 is directly connected, Serial0/0/0
S*   0.0.0.0/0 [1/0] via 192.168.1.130
```

### Router 1
```batch
R1(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.129
R1(config)# do show ip route
```

##### Resultado:
```batch
     192.168.0.0/25 is subnetted, 1 subnets
C       192.168.0.128 is directly connected, FastEthernet0/0
     192.168.1.0/24 is variably subnetted, 3 subnets, 2 masks
S       192.168.1.0/25 [1/0] via 192.168.1.134
C       192.168.1.128/30 is directly connected, Serial0/0/0
C       192.168.1.132/30 is directly connected, Serial0/0/1
S*   0.0.0.0/0 [1/0] via 192.168.1.129
```

#### Router 2
```batch
R2(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.133
R2(config)# do show ip route
```

##### Resultado:
```batch
     192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.1.0/25 is directly connected, FastEthernet0/0
C       192.168.1.132/30 is directly connected, Serial0/0/0
S*   0.0.0.0/0 [1/0] via 192.168.1.133
```

## Teeste de conectividade

__PC0 $\to$ PC4__

```batch
C:\>ping 192.168.1.1
```

##### Resultado:

```batch
Pinging 192.168.1.1 with 32 bytes of data:

Reply from 192.168.1.1: bytes=32 time=5ms TTL=125
Reply from 192.168.1.1: bytes=32 time=3ms TTL=125
Reply from 192.168.1.1: bytes=32 time=2ms TTL=125
Reply from 192.168.1.1: bytes=32 time=3ms TTL=125

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 5ms, Average = 3ms
```