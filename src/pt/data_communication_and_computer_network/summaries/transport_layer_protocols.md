# Protocolos da Camada de Transporte

## Comunicação entre processos
A camada de enlace é responsável pela transmissão de _frames_ entre dois nós adjacentes conectados por um enlace físico (_link_). Essa comunicação é denominada __comunicação node to node__.

A camada de rede é responsável pelo roteamento de datagramas entre dois hosts. Isso é denominado __comunicação host to host__.

A comunicação na Internet náo definida apenas como sendo a troca de dados entre dois nós ou hosts. A comunicação real ocorre entre processos. Precisamos da __comunicação processo para processo__ (entre processos). Entretanto, vários processos podem estar em execução no host de origem e vários processos em execução no host de destino. Sendo assim, precisamos de um mecanismo para transferir dados de um processo em execução no host de origem para um processo correspondente em execução no host de destino.

A camada de transporte é responsável pela comunicação entre processos - __envio/entrega__ de um pacote de um processo para outro. Dois processos se comunicam em uma relação __cliente/servidor__.

### Endereçamento
Na camada de enlace de dados, utilizamos o endereço MAC para escolher um nó entre vários nós, caso a conexão não seja ponto a ponto

Na camada de rede, utilizamos o endereço IP para escolher um host entre vários hosts.

Na camada de transporte, utilizamos o endereço de camada dee transporte, denominado __número de porta__, para escolher un entre vários processos que estão em execução no host de destino. O número da porta de destino é necessário para entrega e o número de porta de origem é necessário para a resposta.

O processo cliente define para si mesmo um número de porta, escolhido de forma aleatória pelo software da camada de transporte, em execução no host cliente. Este é denominado __número de porta efémera__.

Um processo no servidor também deve definir o seu número de porta. Esse número de porta, entretanto, não pode ser escolhido aleatoriamente. Se um servidor, executa um processo servidor e atribui um número aleatório para seu número de porta, um processo cliente que deseje acessar e usar seus serviços não saberá que número de porta deve usar.

### Faixa de Endereços IANA
A __IANA (Internet Assigned Number Authority)__ dividiu o número de portas em três faixas: conhecidos, registados e dinâmicos (ou privados).

- __Portas Conhecidas (well-known port numbers):__ As portas na faixa de 0 a 1023 são atribuídas e controladas pela IANA.
- __Portas registadas:__ As portas na faixa de 1024 e 49151 não são atribuídas ou controladas pela IANA. Elas podem ser registadas na IANA para impedir duplicação.
- __Portas dinâmicas:__ As portas na faixa de 49152 a 65535 não são controladas nem registadas. Elas podem ser usadas por qualquer processo. Esta são denominadas portas efémeras.

[Lista de portas dos protocolos TCP e UDP](https://pt.wikipedia.org/wiki/Lista_de_portas_dos_protocolos_TCP_e_UDP)

### Endereço Socket
Endereço _Socket_ é o nome dado a combinação entre endereço IP e um número de porta. É usado pra estabelecer uma conexão virtual entre dois processos finais.

O número de Porta encontra-se associado a uma entidade específica da camada de aplicação.

O protocolo de camada de transporte precisa de um par de endereços socket: o endereço socket cliente e o endereço socket no servidor. Essas informações fazem parte do cabeçalho IP e do cabeçalho do protocolo de camada de transporte. O cabeçalho IP contém os endereços IP e os cabeçalhos UDP e TCP contém os números das portas.

### Multiplexação e Demultiplexação
Um mecanismo de endereçamento que possibilita à camada de transporte multiplexar dados na origem provenientes de diferentes aplicações, transmiti-los por um circuito virtual e os demultiplexar no destino.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/multiplexagem.png" alt="Multiplexação e Demultiplexação">
</div>

### Multiplexação
No lado do emissor, podem existir vários processos que precisam transmitir pacotes. Entretanto, há somente um protocolo de camada de transporte em execução em dado instante. Trata-se de uma relação de vários para um e que requer a multiplexação. O protocolo de transporte aceita mensagens provenientes de diferentes processos, diferenciados pelos números de porta e elas atribuídas. Após acrescentar o cabeçalho, a camada de transporte passa o pacote para a camada de rede.

### Demultiplexação
No lado do recetor, relação é de um para vários e requer desmultiplexação. A camada de transporte recebe os datagramas da camada de rede. Após a verificação de erros e a eliminação do cabeçalho, a camada de transporte entrega cada mensagem para o processo apropriado baseado no número de porta.

## Serviços Não Orientado a Conexão vs Serviços Orientados a Conexão
### Serviços Não Orientado a Conexão
Em um __serviço de transporte não orientado a conexão (_connectionless_)__, os pacotes são transmitidos de uma parte a outra sem a necessidade do estabelecer ou libertar circuitos virtuais.

Os pacotes não são numerados, durante a sua transmissão, eles podem ser corrompidos ou perdidos ou ,então, podem até chegar fora de ordem.

Também não existe confirmação de que os pacotes foram recebidos.

__Protocolo:__ UDP

### Serviços Orientado a Conexão
Em um __serviço orientado a conexão (_connection-oriented_)__, estabelece-se, primeiro, uma conexão entre a origem e o destino dos dados. Após a conexão, os dados podem ser transferidos.No Final,a conexão é encerrada.

__Protocolos:__ TCP e SCTP

## Confiável vs Não-confiável
A camada de transporte oferece duas opções de serviços de transporte de dados: confiável ou não confiável.

Se o programa na camada de aplicação requerer confiabilidade, necessitamos utilizar um protocolo de camada de transporte confiável que implemente mecanismos de controlo de fluxo, controle de erros e ordenação de pacotes. Isso implica em um serviço mais lento e mais complexo.

Por outro lado, o programa na camada de aplicação pode não requerer confiabilidade no transporte de dados, ou por implementar mecanismo próprios de controle de fluxo, controle de erros e ordenação de pacotes, ou por requerer serviços mais rápido, ou pela natureza do serviço não exigir controle de fluxo e de erros (aplicação em tempo real). Para esses casos, podemos usar um protocolo não confiável.

Apesar da camada de enlace ser confiável implementar controle de fluxo e de erros, não garante a garante a confiabilidade a camada de transporte por si só. A confiabilidade na camada de enlace é implementada entre dois nós adjacentes. Na maioria dos casos, precisamos da confiabilidade extremo a extremo (end to end). Como a camada de rede no Internet não é confiável (modalidade _best effort_), necessitamos implementar confiabilidade na camada de transporte.

__Protocolos confiáveis:__ TCP e SCTP

__Protocolos não confiáveis:__ UDP

## UDP
O __UDP (_User Datagram Protocol_)__ é um protocolo da camada de transporte __não orientado a conexão (_connection-less_)__ e não confiável. Ele não adiciona nenhum controlo adicional aos serviços de entrega do IP, exceto pelo fato de implementar a comunicação entre processos, em vez da comunicação entre hosts. Da mesma forma, a verificação de erros é implementada de forma muito limitada.

### Vantagens do UDP
É um protocolo muito simples com um mínimo de _overhead_. Se um processo quiser enviar uma pequena mensagem e não se preocupar muito com a confiabilidade, o UDP é uma boa escolha. Enviar pequenas mensagens através do UDP exige menor interação entre emissor e o recetor do que quando usamos o TCP ou o SCTP.

### User Datagram
Os pacotes UDP, denominados __user datagrams__ possuem um cabeçalho de tamanho fixo de 8 bytes e formado por: porta de origem, porta de destino, comprimento e _checksum_.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/UDP.png" alt="Formato de um datagrama UDP">
</div>

#### Porta de Origem
Especifica o número de porta usado pelo processo em execução no host origem.

Têm 16 bits de comprimento (0 a 65535).

Se o host de origem for um cliente, o número da porta (na maioria dos casos), é um número de porta efémera aleatório gerado pelo UDP.

Se o host de origem for um servidor, o número da porta (na maioria dos casos), é um número de porta conhecido.

#### Porta de Destino
Especifica o número de porta usado pelo processo em execução no host destino.

Têm 16 bits de comprimento.

Se o host de destino for um servidor, o número da porta (na maioria dos casos), é um número de porta conhecido.

Se o host de destino for um cliente, o número da porta (na maioria dos casos), é um número de porta efémera. Nesse caso, o servidor copia o número de porta que recebeu no pacote de solicitação.

#### Comprimento
Têm 16 bits de comprimento.

Define o comprimento total de um datagrama UDP, compreendendo cabeçalho mais dados.

Os 16bits podem definir um comprimento total entre 0 a 65535 bytes. Entretanto, o comprimento total deve ser, pois um datagrama UDP deve ser repassado em um datagrama IP de comprimento total igual a 65535 bytes.

O campo de comprimento em um datagrama UDP, na realidade, é desnecessário. Um datagrama UDP deve ser encapsulado em um datagrama IP. Existe um campo no datagrama IP que estabelece o comprimento total do pacote. Há outro campo no datagrama IP para definir o comprimento do cabeçalho. Portanto, se subtrairmos o valor do segundo campo do primeiro, podemos calcular o comprimento do datagrama UDP, encapsulado em uma datagrama IP.

Entretanto, os projetistas deo protocolo UDP acharam que seria mais eficiente que o UDP no destino calculasse o comprimento dos dados a partir das informações fornecidas no datagrama UDP, em vez de solicitar ao driver IP para fornecer tais informações. Devemos lembrar que, quando o driver IP entrega um datagrama UDP à camada UDP, ele já eliminou o cabeçalho IP.

#### Checksum
Têm 16 bits de comprimento e é usado para detetar erros na transmissão de datagrama UDP (cabeçalho mais dados).

### Checksum no UDP
O cálculo do checksum realizado para datagramas UDP é diferente do cálculo para pacotes IP e ICMP. Nesse caso, o checksum inclui três secções: um pseudocabeçalho, o cabeçalho UDP e os dados provenientes da camada de aplicação.

P pseudocabeçalho faz parte do cabeçalho de um pacote IP, no qual um datagrama UDP será encapsulado, com alguns campos preenchidos com 0s.

Se no cálculo do checksum não for incluído o pseudocabeçalho, pode ser um user datagram recebido seja considerado livre de erros. Entretanto, caso o cabeçalho IP esteja corrompido, o datagrama poderiam ser indevidamente entregues a um host incorreto.

O campo de protocolo é acrescentado para garantir que o pacote pertençe ao UDP, e não a outro protocolo da camada de transporte. O valor do campo de protocolo para o UDP é 17. Se esse valor for modificado durante a transmissão, o cálculo do _checksum_ no recetor irá ser detetado e o UDP descartara o pacote. Ele não será entregue a um protocolo incorreto.

### Uso Opcional do Checksum no UDP
O cálculo do checksum e sua inclusão em um datagrama UDP são opcionais. Se o checksum não for calculado, esse campo será preenchido com bits a 1s. Mote que o checksum calculado jamais pode conter todos os bits a 1, pois isso significaria que a soma deveria ser igual a 0, o que é impossível, porque requer que o valor de todos so campos fossem iguais a 0.

### Operações do UDP
O UDP implementa serviços de transporte não orientados a conexão. Isso significa que cada datagrama de usuário enviando pelo UDP é um datagrama independente.

Não existe nenhuma relação entre os diferentes datagramas de usuários, mesmo se eles forem provenientes de um mesmo processo de origem e tiverem o mesmo programa de destino.

Os datagramas não são numerados.

Não existe mecanismos para estabelecer e/ou terminar uma conexão virtual, ao contrário do que acontece com o TCP. Isso significa que cada datagrama pode tráfegar por um caminho diferente.

Como não existe uma conexão virtual os processos de aplicação não podem entregar um fluxo de dados contínuo para o UDP e esperar que o UDP os transmita em diferentes datagramas correlacionados. Em vez disso, cada solicitação de ser suficiente pequena para caber em um único user datagram.

> Apenas processos que transmitem mensagens curtas devem usar o UDP.


### Controlo de Fluxo e de Erros
O UDP é um protocolo de transmissão muito simples e não confiável. Não implementa controle de fluxo e, portanto, nenhum mecanismo de janelamento. O recetor pode ser inundado com um número excessivo de mensagens que chegam a ele.

O UDP não implementa mecanismos de controle de erros, exceto o checksum. Isso significa que o emissor não sabe se uma mensagem foi perdida ou duplicada. Quando o recetor deteta um erro por meio do checksum, o datagrama é descartado de maneira impercetível.

A ausência de controlo de fluxo e de controlo de erros significa que um processo de aplicação usando UDP deve implementar esses mecanismos.

### Encapsulamento e Desencapsulamento
Para transmitir uma mensagem de um processo a outro, o protocolo UDP encapsula e desencapsulamento mensagens em um datagrama IP.

### Formação de Filas
No UDP, portas são associadas à filas.

### Formação de Filas do Lado do Cliente
Quando um processo no lado cliente é iniciado, este solicita para o sistema operacional um número de porta. Algumas implementações criam tanto uma fila de chegada como uma de saída associada a cada processo. Outras criam apenas uma fila de chegada associada a cada processo.

As filas abertas pelo cliente são, na maioria dos casos, identificadas pelos números de porta efémeras. As filas funcionam enquanto o processo está em execução. Quando o processo termina, as filas são removidas da memória.

Um processo cliente pode enviar mensagens para uma fila de chegada usando o número da porta de origem especificado na solicitação. O UDP monta as mensagens uma por uma e, após acrescentar o cabeçalho UDP, os entrega ao IP. Uma fila de chegada pode acabar inundada com dados em demasia. Caso isso ocorra, o sistema operacional poderá solicitar ao processo cliente para aguardar antes de transmitir outras mensagens.

Quando uma mensagem chega em um cliente, o UDP verifica se foi criada uma fila de chegada para o número da porta especificado no campo de número de porta de destino do user datagram. Se existir uma fila destas, o UDP desloca o user datagram recebido para o final da fila. Caso não exista uma fila destas configurada, o UDP descarta o user datagram e solicita ao protocolo ICMP para enviar uma mensagem de Destino inalcançável (porta inalcançável) para o servidor.

Todas as mensagens que chegam a determinado programa cliente, sejam elas provenientes de um mesmo servidor ou de outro, são enviadas para uma mesma fila. Uma fila de chegada pode estourar. Se isso acontecer, o UDP descarta os user datagrams e solicita que seja enviada uma mensagem de porta inalcançável para o servidor.

### Formação de Filas do Lado do Servidor
No servidor, o mecanismo de criação de filas é diferente. Um servidor cria filas de chegada e de saída, associadas a um número de porta conhecido, quando ele inicia sua execução.

As filas permanecem ativas enquanto o processo servidor permanecer em execução.

Quando chega uma mensagem para um servidor, o UDP verifica se foi criada uma fila de chegada para o número de porta especificado no campo de número de porta de destino do user datagram. Se existir uma fila destas, o UDP envia o user datagram recebido para o final da fila. Se não existir tal fila, o UDP descarta o user datagram e solicita ao protocolo ICMP para enviar uma mensagem de porta __inalcançável ao cliente__.

Todas as mensagens que chegam para determinado servidor, sejam elas provenientes do mesmo cliente ou de outro, são enviadas para a mesma fila.

Pode ocorrer um processo de estouro de capacidade de uma fila de chegada. Caso isso aconteça, o UDP descarta o user datagram e solicita que seja enviada uma mensagem ICMP de porta __inalcançável ao cliente__.

Quando um servidor quiser responder a um cliente, ele envia mensagens para a fila de chegada, usando o número de porta de origem especificado na solicitação.

O UDP remove as mensagens uma por uma e, após acrescentar o cabeçalho UDP, as entrega ao IP.

Pode ocorrer um processo de estouro de capacidade em uma fila de chegada. Caso isso aconteça, o sistema operacional solicita ao servidor para aguardar antes de enviar outras mensagens.

### Uso do UDP
O UDP é adequado para um processo que requeira comunicação solicitação de resposta sim-ples com pouca preocupação com controle de erros e de fluxo.

O UDP é adequado para um processo que implemente mecanismos internos de controle de fluxo e de erros.

__Exemplo:__ [TFTP](https://pt.wikipedia.org/wiki/Trivial_File_Transfer_Protocol)

- O UDP é um protocolo de transporte indicado para multicast. O recurso de multicast está embutido no software UDP, mas não no software TCP.
- O UDP é muito utilizado no gerenciamento de redes, protocolo [SNMP](https://pt.wikipedia.org/wiki/Simple_Network_Management_Protocol).
- O UDP é usado em alguns protocolos de roteamento para atualização de rotas como o [RIP (Routing Information Protocol)](https://pt.wikipedia.org/wiki/Routing_Information_Protocol).

## TCP
O protocolo __TCP (_Transmission Control Protocol_)__ assim como o __UDP__ , é um protocolo de comunicação entre processos finais (comunicação processo para processo). Portanto, o TCP, bem como o UDP, usa números de portas.

Diferentemente do UDP, o TCP é um protocolo orientado a conexão. Ele cria uma conexão virtual entre dois processos TCPs para transmissão de dados.

O TCP implementa mecanismos de controle de fluxo e de erros na camada de transporte.

> O TCP é um protocolo da camada de transporte orientado a conexão e confiável.

### Serviços TCP
#Comunicação Entre Processos
Assim como o UDP, o TCP implementa a comunicação entre processos utilizando números de porta.

[Lista de portas dos protocolos TCP e UDP](https://pt.wikipedia.org/wiki/Lista_de_portas_dos_protocolos_TCP_e_UDP)

### Serviços de Entrega de Fluxo de Dados
O TCP, diferentemente do UDP, é um protocolo orientado a fluxo de dados.

O TCP possibilita a um processo enviar dados na forma de um fluxo de bytes e possibilita ao processo de receção na forma de fluxo de bytes.

O TCP cria um ambiente no qual os dois processos parecem estar conectados por um "canal" imaginário que transporta seus dados pela Internet.

O processo emissor produz um fluxo de bytes e o processo receptor os consome.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/fluxo_de_dados_TCP.png" alt="Fluxo de Dados TCP">
</div>

### Buffer de Transmissão e Receção
Como existe a possibilidade dos processos de transmissão e de receção não gerarem ou lerem dados em uma mesma velocidade, o TCP precisa de _buffers_ para seu armazenamento. Existem dois buffers, um _buffer_ de transmissão e um _buffer_ de receção, um cada direção.

Uma forma de implementar um _buffer_ é usar lista circular de posição 1 byte, com uma capacidade (normalmente) de centenas de milhares de bytes.

No lado do emissor, o _buffer_ pode ser definido por três tipos distintos de área.
- Área que contém espaços vazios que podem ser preenchidos pelo processo transmissor.
- Área que armazena bytes que foram enviados, mas ainda não confirmados pelo recetor. O TCP mantém esses bytes no buffer até receber uma confirmação.
- Área que contém bytes a serem enviados pelo transmissor TCP.

No lado do recetor o buffer circular é dividido em duas áras.
- Área que contém os espaços vazios a serem preenchidos por bytes recebidos da rede.
- Área que contém bytes recebidos que podem ser lidos pelo processo recetor.
- Quando um byte é lido pelo processo recetor, um espaço é limpo e passa a pertencer as área dos espaços vazios.

### Segmentos
Embora o sistema de _buffers_ trate da disparidade entre as velocidades dos processos de geração e leitura de dados, precisamos de mais um passo antes de podermos efetivamente transmitir os dados.

A camada IP, como provedora de serviços para o TCP, precisa enviar dados em pacotes, não na forma de um fluxo de bytes.

Na camada de transporte, o TCP agrupa determinado número de bytes em pacotes, denominados segmento.

O TCP acrescenta um cabeçalho a cada segmento (para fins de controle) e entrega o segmento para a camada IP para sua transmissão.

Os segmentos são encapsulados em datagramas IP e transmitidos.

Os segmentos podem ser recebidos fora de ordem, ser algum for perdido ou corrompido, precisa ser reenviado.

Toda essa operação é transparente para o processo de receção. Todas essas tarefas são implementadas pelo TCP sem que o processo recetor tome conhecimento dessas atividades.

Os segmentos não precisão ser do mesmo tamanho.

### Comunicação Full-Duplex
O TCP oferece serviços full-duplex no qual podem fluir em ambos as direções simultaneamente. Cada processo TCP implementa um buffer de transmissão e um de receção e os segmentos trafegam em ambos as direções.

### Serviço Orientado a Conexão
O TCP, diferentemente do UDP, é um protocolo orientado a conexão. Quando um processo no ponto A quer enviar e receber dados de outro ponto B, ocorre o seguinte:

1. Os dois processos TCPs estabelecem uma conexão (virtual) entre eles.
2. Os dados são trocados em ambos os sentidos.
2. A conexão é encerrada.

Um segmento TCP é encapsulado em um datagrama IP e pode ser recebido fora de ordem, perdido ou corrompido e, em seguida, precisa ser reenviado.

Cada um deles pode ser transmitido por um caminho diferente até atingir o destino.

O TCP cria um ambiente orientado a fluxo de dados no qual ele assume a responsabilidade de entregar na ordem correta os bytes ao destino.

### Serviço Confiável
O TCP é um protocolo de transporte confiável. Ele implementa mecanismos de confirmação para validar a chegada segura dos dados.

#📚 Saber mais
[Comunicação de Dados e Redes de Computadores - Behrouz A. Forouzan](https://books.google.pt/books/about/Comunica%C3%A7%C3%A3o_de_Dados_e_Redes_de_Comput.html?id=FIaDr9ZtwXgC&source=kp_book_description&redir_esc=y)
