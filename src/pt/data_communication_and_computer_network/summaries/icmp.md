# ICMP - Internet Control Message Protocol

ICMP é um protocolo de rede usado para enviar mensagens relacionadas com problemas que ocorrem durante a transmissão de dados.

Como o protocolo IP trata-se de um protocolo não "confiável" do tipo best effort que não garante que os pacotes são entregues ao destinatário. Caso ocorra um problema na transmissão, o protocolo IP não notifica o problema ao emissor.

O ICMP é o componente da pilha TCP/IP que lida com estas limitações do IP, exceto a "confiança", que têm de ser as camadas superiores a fornecer.

Geralmente as mensagens do ICMP são tratadas na camada de Internet (IP) ou então na camada de Transporte (TCP ou UDP).

O ICMP não corrige qualquer problema, apenas reporta a existência do erro. Qualquer erro que ocorra é reportado ao emissor dos datagramas e não aos routers por onde estes passaram, pois o TCP/IP não transporta qualquer informação acerca do caminho percorrido.

Quando ocorre um problema com a mensagem de ICMP não é enviada mensagem de ICMP a reportar esse problema.

## Formato do ICMP
As mensagens ICMP têm todas um formato próprio, mas todas começam com os mesmos três campos.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/ICMP.png" alt="ospf tipos rede lsa">
</div>

- __Tipo:__ Identifica a classe de mensagens ICMP
- __Código:__ Usado para especificar alguns parâmetros da mensagem
- __Verificação de erro:__ Código de verificação de erros sobre toda a mensagem ICMP
- __Parâmetros:__ Usado para especificar outros parâmetros mais complexos.

## Tipos de mensagens mais comuns
### Pedido de resposta e resposta ao pedido (Echo Request e Echo reply)
[Internet Control Message Protocol (ICMP) Parameters](https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml)

Usado pelo comando `ping` para verificar a conectividade. O `ping` envia uma mensagem ___Echo Request___ para um dispositivo e o dispositivo responde com um ___Echo Reply___ .

| Tipo	| Código | Descrição |
| :--:  |  :--:  |    ---    |
|  0    |    0   | Echo Reply (Resposta Eco, usado pelo comando ping) |
|  8	|    0   | Echo Request (Requisição de Eco, usado pelo comando ping)|

### Destino inalcançável (Destination Unreachable)
Quando um router não consegue encaminhar um pacote, usa o protocolo ICMP para enviar uma mensagem de retorno a informar a situação. Assim o emissor pode tentar enviar o pacote por outro caminho.

| Tipo | Código | Descrição |
| :--: |  :--:  |    :--    |
|   3  |    0   | Rede de destino não alcançável      |
|      |    1   | Host de destino não alcançável      |
|      |    2	| Protocolo de destino não alcançável |
|      |    3	| Porta de destino não alcançável     |
|      |    4	| Fragmentação requerida, e o bit `Don't Fragment` foi configurado | 
|      |    5	| Falha na rota de origem |
|      |    6	| Rede de destino desconhecida |
|      |    7	| Host de destino desconhecido |
|      |    8	| Host de origem isolado |
|      |   9	| Rede proibida administrativamente |
|      |   10	| Host proibido administrativamente |
|      |   11	| Rede inalcançável para Type of Service |
|      |   12	| Host inalcançável para Type of Service |
|      |  13	| Comunicação proibida administrativamente |
|      |  14	| Violação de precedência de Host | 
|      |  15	| Corte de precedência em efeito |

### Retardar a origem (Source Quench)
A mensagem indica que a origem está a enviar pacotes a um ritmo superior ao suportado pelo equipamento destino. Pretende-se, com esta mensagem, que o emissor reduza a taxa de transmissão de pacotes.

::: danger Obsoleta pela RFC 6633
É um mecanismo rudimentar de controlo de fluxo
:::

| Tipo	| Código | Descrição |
| :--: | :--: | :-- |
|  4  |  0  | Fonte saciável (source quench) - Controlo de fluxo elementar |

###  Redirecionar (Redirect)
Um router pode enviar esta mensagem sempre que receber um pacote para o qual existe um outro router com uma rota melhor. Pretende-se , assim que o emissor envie os pacotes através da melhor rota.

| Tipo | Código | Descrição |
| :--: |  :--:  |    ---    |
|   5  |    0   | Redirecionamento para rede |
|      |    1   | Redirecionamento para host |
|      |    2	| Redirecionamento para tipo de serviço e rede |
|      |    3	| Redirecionamento para tipo de serviço e host |

### Ultrapassou o TTL limite (Time Exceeded)
A mensagem informa que o pacote foi descartado porque o TTL foi excedido. Este tipo de mensagem é usado, por exemplo pelo comando `traceroute` para descobrir o caminho seguido por um determinado pacote.

#### Funcionamento do `traceroute`
- Inicialmente é enviado um pacote IP com TTL igual a 1.
- Ao chegar ao primeiro router o TTL é decrementado, passando a ter o valor de 0 e o pacote é descartado.
- Simultaneamente, o router devolve uma mensagem ICMP do tipo TTL Exceeded.
- Através da mensagem, o traceroute determina o endereço do router.
- Envia um outro pacote IP mas desta vez com o TTL igual a 2.
- Esse valor vai ser decrementado é um unidade conforme vai passado pelos routers até ser 0 e descartado.
- Simultaneamente é devolvido uma mensagem ICMP do tipo TTL Exceeded.
- Caso não se tenha chegado ao destino, repete-se o processo incrementado o valor TTL anterior em uma unidade.

Desta forma, consegue determinar-se os endereços de todos os routers do caminho entre origem e o destino.

| Tipo | Código	| Descrição |
| :--: |  :--:  |    ---    |
|  11  |   0    | TTL igual a o durante o trânsito | 
|      |    1   | TTL igual a o durante o reconstrução |

### Problema de parâmetros (Parameter Problem)
Mensagem enviada por um router ou outro dispositivo para informar que existe um erro sintático ou semântico no cabeçalho do pacote IP. A mensagem inclui um ponteiro para o byte em que foi detetado o erro.

| Tipo | Código	| Descrição |
| :--: |  :--:  |  --- | 
|  12  |   0	| Ponteiro indica o erro |
|      |   1	| Faltando opção requerida |
|      |   2	| Comprimento errado |

### Marca de tempo (Timestamp Request e Timestamp Reply)
Mensagem usada para medir o tempo de ida e volta entre emissor e recetor.

| Tipo | Código | Descrição |
| :--: |  :--:  | --- |
|  13  |   0	| Timestamp |
|  14  |   0	| Resposta do Timestamp |

### Information Request & Information Reply Message
Esta mensagem pode ser envida com os campos de rede de origem que se encontra no header e com o endereço de destino a 0 (que significa esta rede). O destinatário envia a resposta com os endereços totalmente especificados.

Esta mensagem serve para um host encontrar o número da rede em que se encontra.

Tipo	Código	Descrição
15	0	Pedido de informação
16	0	Resposta de informação
::: danger Obsoleta pela RFC 6918
$\text{ }$
:::

### Endereço de máscara (Address Mask e Address Mask Reply)
Mensagem usada para determinar o valor correto da máscara de rede. O emissor envia um broadcast com uma mensagem de pedido de máscara de rede. O emissor envia um broadcast com uma mensagem de pedido de máscara, a que o router da LAN responde com uma mensagem de resposta com o valor de máscara pedido.

| Tipo | Código | Descrição |
| :--: |  :--:  |    ---    |
|  17  |   0    | Requisição de máscara de endereço |
|  18  |   0	| Resposta de máscara de endereço |

::: danger Obsoleta pela RFC 6918
$\text{ }$
:::
