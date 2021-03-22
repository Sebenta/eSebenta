# OSPF - Open Shortest Path First

O OSPF é um protocolo standard aberto de encaminhamento dinâmico baseado na topologia desenvolvido pelo IEFT (internet Engineering Task Force). [Wiki - OSPF](https://pt.wikipedia.org/wiki/Open_Shortest_Path_First) 

Também conhecido como algoritmo de Dijkstra. 
[Wiki - Algoritmo de Dijkstra](https://pt.wikipedia.org/wiki/Algoritmo_de_Dijkstra), [Wiki - Edsger Dijkstra](https://pt.wikipedia.org/wiki/Edsger_Dijkstra)

Considera a largura de banda na determinação da métrica para as rotas.

Envia seus updates via multicast, apenas routers que estejam com este protocolo ativo conseguem processar os pacotes de atualização `(224.0.0.5 3 224.0.0.6)`.

Atualizações incrementais, só é enviado as informação com as alterações,isso faz com que se obtenha uma economia de largura de banda, update e processamento.

Em comparação com o RIP temos um menor tempo de convergência e maior economia de largura.

Permite a hierarquização da rede por meio de sua divisão em domínios de roteamento, chamados de áreas. As áreas criadas são usadas para controlar como as informações de roteamento devem ser compartilhadas na rede.

O tráfego entre as áreas é coordenado pelo router de borda da área (ABR).

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf.png" alt="OSPF">
</div>

A segmentação também reduz o impacto na CPU e memória dos routers.

Na existência de várias áreas na rede, será nomeada uma dessa area para ser a __area 0__, também chamada de backbone area ou área de trânsito. A __area 0__ é a área principal e têm sempre de existir. Todas as demais áreas têm de se ligar diretamente a __area 0__. Caso a ligação direta não seja possível, temos de usar virtual links, túneis criados para "enganar" o OSPF, fazendo-o pensar que a área em questão encontra-se diretamente conectada a __área 0__.

## OSPF Area

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf_tipos_rede_lsa.png" alt="ospf tipos rede lsa">
</div>

### Internal Router

Router que possui todas as suas interfaces em uma mesma área

### Backbone Router

Routers que tenham pelo menos um interface ligada a área 0 (backbone area).

### Area Border Router (ABR)

Este router faz fronteira com duas ou mais áreas.

Os routers ABR têm de manter múltiplas base de dados topológicas , uma para cada área a que estão ligados.

Router que possui pelo menos um interface na Area 0.

### Autonomous System Border Router (ASBR)

Router fronteira que está ligado a um outro sistema autónomo, ou seja, a uma rede com outro protocolo de encaminhamento ou com protocolo OSPF, mas com outro identificador de processo OSPF.

## Tabelas OSPF

__Neighbor Table__: Conexões adjacentes.

__Topology Table / Link State Database (LSDB)__: Visão completa da rede (Existe um por área).

__Routing Information Base (RIB)__: Contém as melhores rotas para um determinado destino.

O OSPF suporta o balanceamento de carga entre até 6 rotas de igual custo para uma mesma rede. (O padrão em routers Cisco é 4). [CISCO - Como funciona o balanceamento de carga?](https://www.cisco.com/c/pt_br/support/docs/ip/border-gateway-protocol-bgp/5212-46.html)

## Tipos de Pacotes OSPF
[OSPF Packet Types ](https://sites.google.com/site/amitsciscozone/ospf/ospf-packet-types)

### Hello

Responsáveis pela descoberta de routers vizinhos e pela manutenção da relação de vizinhança entre eles.

- Em redes Broadcast e ponto-a-ponto são enviados a cada 10 segundos.
- Em redes non-broadcast a cada 30 segundos.
- Se estiver 4 tempos de hello interval sem receber uma mensagem de hello de um determinado vizinho, esse vizinho é considerado "morto" (Dead Interval), o vizinho será considerado inativo e as rotas aprendidas por esse vinho serão eliminadas.

O pacote "Hello" transporta um série de informações. caso tenha alguma incompatibilidade em qualquer um dos campos abaixo a relação de vizinhança não será formada:

- Area ID: Suas interfaces devem pertencer a mesma área, sub-rede e máscara de rede.
- AUtenticação: Se houver devem adotar a mesma senha.
- Hello interval e Dead interval: Os valores devem ser os mesmos nos dois equipamentos.
- Stub Area Flag devem ter o mesmo valor.

### DBD (Database Descriptor)

Verifica se as tabelas LSDB existem e se estão sincronizadas, os routers em uma mesma área devem ter a mesma tabela.

### LSR (Link State Request)

Ao receber um DBD e se existir rotas que ele não possui, ele envia um pacote LSR para o router vizinho solicitando informações detalhadas sobre tais rotas.

### LSU (Link State Update)

Ao receber um pacote LSR, o router encaminha ao solicitante as informações pedidas.

### LSAck (Link State Acknowledgment Packet)

É usado para confirmar a receção de alguns pacotes. Os pacotes "Hello" não são confirmados.

## Operações do OSPF

- Criação de relações de vizinhança e de adjacência com outros routers.
- Troca de informações de encaminhamento
- Determinação de rotas.

Os routers com OSPF ativo começam pro estabelecer relações de vizinhança entre si que determinam quem participa nas comunicações do tipo OSPF. Após estabelecerem essas relações de vizinhança, os routers trocam as suas bases de dados relativas à topologia e às possíveis rotas. De seguida, com esta informação topológica, os routers calculam as melhores rotas para os vários destinos.

### Criação de relações de vizinhança

#### Down
A interface não recebe pacotes "Hello".

#### Init
São recebidos pacotes "Hello" de outros routers, pelo que se inicia a criação de uma vizinhança.

#### 2 Way
O router recebe uma mensagem que o inclui como possível vizinho e que confirma que os parâmetros de caracterização do vizinho estão corretos.

#### ExStart
Estabelece-se uma relação mestre/escravo para troca de mensagens de sincronização da base de dados. O mestre é o router co maior RID.

#### Exchange
Envio de mensagem Database Description e Link State Request, que contêm informação de encaminhamento.

#### Loading
Pedido aos routers vizinhos de informação topológica atualizada, os quais respondem com mensagens de atualização (LSU - Link State Update).

#### Full
A informação topológica está sincronizada entre dois routers.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf_operacoes.png" alt="ospf tipos rede lsa">
</div>

## Redes Multi-acesso

Em redes acesso múltiplo com ou sem broadcast, o OSPF opta por reduzir o número de adjacências entre routers, para reduzir o tráfego de pacotes OSPF. Para isso, elege um DR (Designated Router) que vai ter a responsabilidade de receber e propagar informação de atualização, e um outro, como BDR (Backup Designated Router) que ira funcionar como router de backup, para caso o DR falhe.

Todos os routers da rede apenas estabelecem adjacência com o DR.

Enquanto o DR estiver operacional, o BDR recebe todas as atualizações mas não as propaga.

As redes NBMA (Nonbroadcast Multi-Access) para além de elegerem o DR e o BDR ainda requerem uma confirmação OSPF dedicada para que se para que se estabeleçam adjacências corretamente.

A eleição do DR e BDR baseia-se na prioridade do router e na identificação do router (RID - Router ID).

### Prioridade do router
O router que tiver a maior prioridade é eleito DR, o valor padrão é 1, caso todos estejam com o valor padrão é utilizado o router ID para desempate.

Se quisermos impedir que um router participe na eleição, basta alterar a sua prioridade para 0.

### Identificação do router
Baseia-se no endereço de IP das suas interfaces, incluindo a interface loopback.

Se a interface loopback estiver configurada, o RID assume o endereço de loopback, caso contrário, RID passa a ser igual ao maior IP das interfaces configuradas.

[OSPF – Roteador Designado (DR) e Roteador Designado de Backup (BDR)](https://www.comutadores.com.br/ospf-roteador-designado-dr-e-roteador-designado-de-backup-bdr/)

[OSPF Design Guide #Adjacencies](https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html?dtid=osscdc000283#t20)

## Tipos de Rede
### Point-to-point
Consiste num ligação física ou lógica entre dois routers por um único caminho.

Exemplo: Ethernet.

Nesse caso não é necessário a eleição de DR e BDR.

### Broadcast
São redes que permitem o acesso de múltiplos dispositivos e o envio de broadcast.

Precisa de DR e BDR.

### Nonbroadcast
São redes que permitem o acesso a múltiplos dispositivos, mas não permite o envio de broadcast.

Exemplo: ATM, Frame Relay

Dividem-se em dois subtipos:

- __Nonbroadcast Multi-Access:__ Precisa de configuração de DR e DBR. Exige a configuração manual do vizinho via comando neighbor.
- __Point to Multi-point:__ Não precisa de configuração de DR e DBR.

## Tipos de LSA
[OSPF LSA Types Explained](https://networklessons.com/ospf/ospf-lsa-types-explained)

### Tipo 1 - Router LSA
São LSAs enviados por um router para todos os routers da mesma área com informações sobre as suas ligações na sua área (não passa de uma área para outra).

Neste LSA temos a lista de todos os links conectados no roteador.

Se um router tem interfaces em mais de uma área, ele gera LSAs tipo 1 para cada área. Mantém também o LSDB (Link State Data Base), para cada área.

### Tipo 2 - Network LSA
Gerados pelos routers designados (DR) para enviar informações sobre o estado dos restantes routers da mesma área.

### Tipo 3 - Summary LSA
Gerados pelos routers de fronteira de área (ABR) e enviados para todos os routers de uma área a anunciar rotas sumariadas de outras áreas de outras áreas.

### Tipo 4 - Summary ASBR LSA
Gerados pelos routers ASBR.

### Tipo 5 - Autonomous system external LSA
São enviados pelos routers ASB para anunciar rotas externas ao sistema autónomo OSPF.

### Tipo 6 - Multicast OSPF LSA
É utilizado pelo Multicast OSPF, extensão do OSPF pouco utilizada e não é suportada por roteadores Cisco.

### Tipo 7 - Not-so-stubby area LSA
Usado em áreas NSSA, em lugar dos LSAs tipo 5

## Tipos de Áreas
Ao hierarquizarmos a topologia do OSPF criamos várias áreas interligadas por vários tipos de routers para reduzir a carga do CPU no cálculo da topologia. No entanto, esta estrutura obrigou à criação de vários tipos LSA que são trocados entre os diversos routers, o que pode aumentar a carga do CPU dos routers. A solução para o problema consiste em considerar vários tipos de áreas de acordo com o tipo de LSA trocados.

### Standard area: áreas "normais"

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf_standard_area.png" alt="Standard Area">
</div>


### Stub area
Recebe dos ABRs rotas default e LSAs tipo 3 contendo rotas internas sumariadas.

Não pode conter routers ASBR (que recebem informações de outras rede com protocolos de roteamento diferentes do OSPF).

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf_stub_area.png" alt="Stub Area">
</div>

### Totally Stubby area
Semelhante à stub, mas recebe apenas a rota default do ABR. Também não pode conter routers ASBR.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf_totallystub_area.png" alt="Totally Stub Area">
</div>

### Not-so-stubby area (NSSA)
Uma forma da Cisco permitir a existência de um ASBR em uma área stub. permite a passagem de LSAs tipo 7 (gerados pelos ASBR).

Não recebe rota default se não for configurada para tal.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ospf_not_so_stubby_area.png" alt="Not-So-Stubby Area">
</div>

## Métrica OSPF
Também chamada de custo.

Utiliza as larguras de banda acumulativas das interfaces de saída do routers para a rede de destino como o valor de custo.

Quanto menos o valor do custo, melhor a rota.

O custo das interfaces não é imposto pelo protocolo OSPF, podendo cada fabricante adotar um método diferente para o cálculo do custo.No caso da CISCO usa o valor de referencia 100Mbps $(10^8)$.

Para calcular do custo usamos a expressão:

$$custo = \frac{10^8}{largura\ da\ banda}$$

Como resultado só interessa a parte inteira do resultado e o valor mínimo de custo é 1.

__Exemplo:__

$$custo = \frac{100Mbps}{10Mbps}=10$$
$$custo = \frac{100Mbps}{100Mbps}=1$$
$$custo = \frac{100Mbps}{1Gbps}=1$$

> Todas as interfaces de 100M, 1G, 1G ou superior serão consideradas com o mesmo custo

Quando tenho interfaces com velocidades superiores a 100Mbps, deve-se utilizar o comando `auto-cost reference-bandwidth "value"`, para que o problema seja corregido, em redes 1Gbps, utilizaria o valor 1000 como referência. Caso seja necessário fazer essa alteração, é recomendada que ela seja feita em todos os routers para que não haja inconsistência da rede.

## Configuração Básica
### Ativar o processo OSPF - Modo 1
Ativar o processo OSPF no router

Só tem significado localmente, pode ser o mesmo em todos os equipamentos, valor entre 1 e 65535, não pode ser 0.

```batch
config t
router ospf 123
network 192.168.50.0 0.0.0.255 area 0
```

### Ativar o processo OSPF - Modo 2
Indicar para o OSPF qual interface vai participar do processo, a rede que estiver configurada na interface será propagada no OSPF.

```bash
config t
router ospf 123
exit
interface f0/1
ip ospf 123 area 0
```

Faz a mesma coisa, mas agora ativo diretamente na interface, não utilizo o comando network.

## Analisar a configuração do protocolo OSPF
- `show ip route` - Apresenta toda a tabela de encaminhamento.
- `show ip ospf` - Apresenta um resumo da informação associada ao OSPF, nomeadamente os processos OSPF, a indentificação do router, as áreas, estatísticas, ...
- `show ip ospf database` - Apresenta a base de dados do estado das ligações que formam a topologia de rede.
- `show ip ospf interface` - Apresenta informação OSPF relativa às interfaces.
- `show ip ospf neighbor` - Apresenta a lista dos vizinhos OSPF e o estado das adjacências.