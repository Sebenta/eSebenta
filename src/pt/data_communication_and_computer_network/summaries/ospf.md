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

<div style="display: flex;align-items: center;justify-content: center; margin:2rem;">
    <img src="/images/data_communication_and_computer_network/ospf.png" alt="OSPF">
</div>

A segmentação também reduz o impacto na CPU e memória dos routers.

Na existência de várias áreas na rede, será nomeada uma dessa area para ser a __area 0__, também chamada de backbone area ou área de trânsito. A __area 0__ é a área principal e têm sempre de existir. Todas as demais áreas têm de se ligar diretamente a __area 0__. Caso a ligação direta não seja possível, temos de usar virtual links, túneis criados para "enganar" o OSPF, fazendo-o pensar que a área em questão encontra-se diretamente conectada a __área 0__.

## OSPF Area

<div style="display: flex;align-items: center;justify-content: center; margin:2rem;">
    <img src="/images/data_communication_and_computer_network/ospf_tipos_rede_lsa.png" alt="ospf tipos rede lsa">
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


<div style="display: flex;align-items: center;justify-content: center; margin:2rem;">
    <img src="/images/data_communication_and_computer_network/ospf_operacoes.png" alt="ospf tipos rede lsa">
</div>