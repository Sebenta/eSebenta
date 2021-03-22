# RPC - Remote Procedure Call

## Visão geral sobre RPCs
O RPC é uma tecnologia de comunicação entre processos que permite a um programa de computador chamar um procedimento em outro espaço de endereçamento (geralmente em outro computador, conectado por uam rede).O programador não se preocupa com detalhes de implementação dessa interação remota, do ponto de vista do código, a chamada se assemelha a chamadas de procedimentos locais.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/RPC.png" alt="rpc">
</div>

RPC é uma tecnologia de implementação cliente-servidor de computação distribuída. Uma chamada de procedimento remoto é iniciada pelo cliente enviado uma mensagem para um servidor remoto que vai executar um procedimento específico e retornar uma resposta.

Uma diferença importante entre chamadas de procedimentos remotos e chamadas de procedimentos locais é que, no primeiro caso, a chamada pode falhar por problemas da rede. Nesse caso, não há nem mesmo garantia de que o procedimento foi invocado.

## Implementações do RPC
- Sun RPC
    - NFS (Network File System)
    - NIS (Network Information Service)
- Microsoft RPC
- RMI (Remote Method Invocation)
- CORBA (Commom Object Request Broker)
- DCOM (Distributed Component Object Model)

## Rotinas de Adaptação (Stubs)
O cliente não invoca diretamente a função remota. É invocada localmente a client stub e no servidor é invocada a server stub. Estas funções comunicam entre si utilizando um mecanismo de mensagens.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/RPC_rotinas.png" alt="rpc rotinas">
</div>

### Processamento no stub cliente
#### Pedido:
- Recebe o pedido do cliente
- Constrói a mensagem - marshalling
- Envia a mensagem
- Bloqueia à espera da resposta

#### Reposta:
- Recebe a resposta
- Extrai os dados
- Fornece os dados ao cliente

### Processamento no stub servidor
#### Pedido:
- Recebe mensagem com pedido
- Extrai os argumentos
- Invoca a função

#### Resposta:
- Constrói a mensagem com o resultado
- Envia a mensagem
- Bloqueia à espera de um novo pedido

### Serviço de Nomes
Permite que o servidor registe um nome.

Permite aos clientes procurem os servidores.

[RPC - Wikipédia](https://pt.wikipedia.org/wiki/Chamada_de_procedimento_remoto)

## RMI - Remote Method Invocation
A técnica RMI foi introduzida no Java com o objetivo de possibilitar a distribuição do processamento em redes de computadores. Isto consegue-se definido uma interface que permite a criação remota de objetos.

Os packages __java.rmi__ e __java.rmi.server__ contêm as classes, as interfaces e os métodos que tornam possível que um programa Java corra numa determinada máquina e crie um objeto de uma classe num programa que esteja a correr numa máquina remota, através de uma rede de comunicações.

<div class="card-dcn">
    <img src="/images/data_communication_and_computer_network/summaries/RMI.png" alt="rmi">
</div>

O stub é a entidade do lado do cliente RMI que apresenta o objeto remoto. Ao mesmo nível, do lado do servidor , o skeleton é a entidade que vai receber os pedidos remotos de invocação de métodos, por parte do Nível de Referência Remoto (Remote Reference Layer) - nível que existe nos dois lados do modelo e no qual se considera existir uma ligação virtual (LV). A ligação "real" é estabelecida ao __Nível Transporte__, e responsável pelo estabelecimento da conexão entre o cliente e o servidor.

A implementação do RMI implica que o servidor torne público a existência de um determinado objeto. Para isso, estão disponíveis dois métodos que fazem o registo de um nome para o objeto numa aplicação chamada _"RMI Registry"_, que associa um nome a um determinado objeto:

```java
bind()

rebind()
```

Os clientes RMI utilizam o _"RMI Registry"_ para a transformação dos nomes em objetos. Tratando-se de uma aplicação, é necessário iniciá-la antes de tentar declarar nomes de objetos RMI.

O servidor utilizará o `bind()` ou `rebind()` para colocar um nome de um objeto no _"RMI Registry"_.

```java
// Registry.REGISTRY_PORT = 1099
Registry registry = LocateRegistry.createRegistry(Registry.REGISTRY_PORT);

 // MyService = nome da class
MyService service = new MyService();

MyServiceInterface myService = (MyServiceInterface) UnicastRemoteObject.exportObject(service, 0);

registry.rebind("service", myService);
```

O SDK proporciona um utilitário _"rmic"_ que efetua a tarefa de criação das classes _"stub"_ e _"skeleton"_, com base no código do servidor RMI.

Os clientes RMI utilizam um método `lookup()` de uma class "Naming" para localizar o objeto anunciado pelo `bind()` ou `rebind()` efetuados no servidor.

```java
// Registry.REGISTRY_PORT = 1099
Registry registry = LocateRegistry.getRegistry("localhost", Registry.REGISTRY_PORT);
MyServiceInterface  myService = (MyServiceInterface) registry.lookup("service");
```

Ao iniciar um servidor RMI, é necessário iniciar a aplicação _"RMI Registry"_ para que o `rebind()` funcione devidamente.

### Client-Server RMI "step-by-step"
A construção da nossa aplicação cliente-servidor com RMI envolve os seguintes passos:
- Definir e implementar a interface remota;
- Escrever o cliente que usa os objetos remotos;
- Gerar os stubs e skeletons;
- Criar os registos;
- Executar o cliente e o servidor;

> Vou utilizar a "calculadora" como base de exemplo.

#### Comecemos pela definição da interface que vai ser utilizada remotamente pelos clientes.

`Interface - CalculatorInterface.java`
```java
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface CalculatorInterface extends Remote {
    double add(double a, double b) throws RemoteException;
    double sub(double a, double b) throws RemoteException;
    double mult(double a, double b) throws RemoteException;
    double div(double a, double b) throws RemoteException;
}
```

#### O método remoto tem agora de ser concretizado no servidor.

`Servidor de "serviços" - Calculator.java`

```java
import java.rmi.RemoteException;

public class Calculator implements CalculatorInterface {
    @Override
    public double add(double a, double b) throws RemoteException {
        return a + b;
    }

    @Override
    public double sub(double a, double b) throws RemoteException {
        return a - b;
    }

    @Override
    public double mult(double a, double b) throws RemoteException {
        return a * b;
    }

    @Override
    public double div(double a, double b) throws RemoteException {
        if (b == 0) throw new ArithmeticException("divide by zero");
        return a / b;
    }
}
```

#### Passemos agora ao cliente.

Os clientes interagem com a interface dos objetos remotos, e nunca de forma direta com a implementação dos objetos.

`Cliente - Client.java`

```java
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {

    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", Registry.REGISTRY_PORT);
            CalculatorInterface calculator = (CalculatorInterface) registry.lookup("calculator");
            System.out.println("4 + 7 = " + calculator.add(4, 7));
            System.out.println("4 - 7 = " + calculator.sub(4, 7));
            System.out.println("4 x 7 = " + calculator.mult(4, 7));
            System.out.println("4 / 7 = " + calculator.div(4, 7));
            System.out.println("4 / 0 = " + calculator.div(4, 0));
        } catch (RemoteException | NotBoundException | ArithmeticException e) {
            System.err.println(e.getMessage());
        }
    }
}
```

#### Agora vamos prosseguir com o registo do objeto a utilizar remotamente. 
É essencial que o objeto esteja definido no registo para poder ser invocável pelo cliente. Também é necessário que o stub já esteja criado, uma vez que vai ser essa referência a passar entre o registo e os clientes.

`"Registo" - ServerRMI.java`

```java
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class ServerRMI {

    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.createRegistry(Registry.REGISTRY_PORT);
            Calculator calc = new Calculator();
            CalculatorInterface icalc = (CalculatorInterface) UnicastRemoteObject.exportObject(calc, 0);
            registry.bind("calculator", icalc);

            System.out.println("Server ON");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
```

## CORBA
Acrónimo de __Common Object Request Broker Architecture__, é um ambiciosa especificação efetuada por um consórcio de muitas empresas fabricantes de bases de dados e que pretende estabelecer uma linguagem _standard_ para a bases de dados em ambientes __cliente-servidor__, independentemente da linguagem de programação e da base de dados utilizada.

Infraestrutura e arquitetura aberta e independente que as aplicações distribuídas podem utilizar para comunicar entre si.

O CORBA não define uma linguagem propriamente nem um produto, mas um conjunto de regras muito precisas para a criação de serviços e operações que possam ser efetuadas sobre a base de dados.

### Componentes de uma implementação de CORBA
#### Object Request Broker (ORB)
Tem a função de garantir a conectividade entre o cliente e o servidor, independentemente do que estiver pelo meio e das implementações específicas ao nível do cliente e dos servidor.

#### Interface Definition Language (IDL)
Trata-se de um linguagem intermédia que define a interface que o cliente usa para comunicar com o servidor.

Esta linguagem, após compilada, não se destina a gerar binário, mas antes a produzir código para ser utilizado em outras linguagens e sistemas operativos.

#Commom Object Services (CORBAServices)
Implementa os vários serviços necessários ao correto funcionamento do ORB.

#### Internet Inter-ORB Protocol (IIOP)
Trata-se de um standard introduzido no CORBA 2.0 e que especifica como se efetua a comunicação entre ORB numa rede.

#### Desenvolver uma aplicação CORBA
Para poder desenvolver aplicações CORBA, é preciso utilizar o __compilador IDL__ que é distribuído com o __SDK__. O compilador aceita como entrada um __ficheiro IDL__ e produz um ficheiro __".java"__ que, em seguida tem de ser compilado da forma habitual em Java.

É necessário produzir um classe que implemente a interface java produzida pelo compilador IDL, bem como uma implementação do servidor que crie o objeto ORB e proceda à respetiva inicialização.

Finalmente, a aplicação cliente localizará o objeto com que se pretende conectar através _"Naming"_ implementando pelos __CORBAServices__.

Antes de arrancar com o cliente e com o servidor, terá de ser executada a apliacação SDK que implementa este serviço, o _"tnameserv"_.