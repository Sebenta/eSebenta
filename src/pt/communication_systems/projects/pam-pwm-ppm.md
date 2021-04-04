# Modulação PAM, PWM e PPM

## Definição do Problema

Pretende-se implementem um sistema capaz de modular/desmodular sinais utilizando PAM, PWM, como é ilustrado na figura:

<div class="card">
    <img src="/images/communication_systems/projects/pam-pwm-ppm.png" alt="Esquema de montagem PAM, PWM e PPM"/>
</div>

- O sinal PAM deverá ser obtido pelo chaveamento do sinal modulante, utilizando por exemplo um interruptor analógico - HEF4066;
- O sinal PWM deverá ser obtido utilizando um comparador de tensão (por ex. LM311). O sinal de informação é comparado com um sinal triangular.
- O Sinal PPM deverá ser obtido através de um circuito monoestável (NE555) a partir do sinal PWM

Os alunos deverão registar o funcionamento dos circuitos, assim como efetuar medições que permitam comparar o desempenho dos diferentes circuitos desmoduladores, para diferentes frequências do sinal modulante e para diferentes valores do índice de modulação.

### Características dos Sinais

#### Portadora

- Frequência da portadora: 22653Hz
- Amplitude da portadora: 3V

#### Sinal de Informação

- Frequência máxima do sinal modulante: dos 300Hz a 2265.3Hz
- Amplitude máxima do sinal modulante: 2V
- Tipo de sinal: Sinusoidal

## Introdução

### Sistemas de Comunicação

Qualquer sistema de comunicação é formado por três partes: emissor, canal e recetor.

<div class="card-dcn">
    <img src="/images/communication_systems/projects/emissor_canal_recetor.png" alt="Esquema Sistemas de Comunicação"/>
</div>

- O __emissor__ é a pessoa que envia uma mensagem. Pode ser uma estação de transmissão de onde o sinal é transmitido.
- O __canal__ é o meio que os sinais percorrem até chegar ao destino.
- O __recetor__ é a pessoa que recebe a mensagem. Pode ser estação de receção onde o sinal transmitido será recuperado.

#### Tipos de Sinais

Um sinal pode ser visto, como sendo, uma fonte de energia que transmite algumas informações.

Um impulso elétrico ou uma onda eletromagnética que viaja uma distância para transmitir uma mensagem, pode ser chamado de __sinal__.

Dependendo das suas características, os sinais são classificados principalmente em dois tipos: __Analógicos__ e __Digitais__.

#### Sinal Analógico

Pode ser definido como sendo um sinal que varia em uma escala de tempo continuo. Esse sinal continua a variar em relação ao tempo, de acordo com os valores instantâneos (quantitativos), que o representa.

A comunicação baseada em sinais analógicos e valores analógicos é chamada de __Comunicação Analógica__.

#### Sinal Digital

Um sinal de natureza discreta pode ser chamado de __Sinal Digital__. Este sinal tem valores individuais, denotados separadamente, que não se baseiam nos valores anteriores, como se fossem derivados naquele instante do tempo.

Os dígitos binários que têm apenas 1s e 0s são denominados de __valores digitais__. Assim, os sinais que representam 1s e 0s também são chamados de __sinais digitais__. A comunicação baseada em sinais digitais e valores digitais é chamada de __Comunicação Digital__.

#### Sinal Periódico e Sinal Aperiódico

Qualquer sinal analógico ou digital, que repita um padrão ao longo de um período de tempo, é chamado de Sinal Periódico. Este sinal tem padrão que se repete continuamente, sendo assim, fácil de ser assumido ou de ser calculado.

Qualquer sinal analógico ou digital, que não repita o seu padrão num período de tempo é chamado de Sinal Aperiódico. Este sinal tem um padrão continuo, mas que não se repete. Não sendo assim, tão fácil de ser assumido ou de ser calculado.

#### Sinais em Sistemas de Comunicação

Em geral, os sinais que são utilizados em sistemas de comunicação são por natureza analógicos, e estes são transmitidos em formato analógico ou convertido em formato digital e depois transmitidos, dependendo da exigência.

Porém, para que um sinal seja transmitido à distância, sem o efeito da interferência externa ou adição de ruído e sem desaparecer, ele deve passar por um processo denominado Modulação.

### Modulação de Sinal

Para estabelecer uma comunicação confiável, na transmissão de uma mensagem, o sinal de transporte precisa de ter a ajuda de um sinal de alta frequência que não deve afetar as características originais do sinal de mensagem.

As características do sinal da mensagem, se forem alteradas, a mensagem contida nela também é alterada. Portanto, é preciso ter alguns cuidados com o sinal da mensagem. Um sinal de alta frequência pode viajar até uma distância maior, sem se afetado por distúrbios externos.

Recorremos a ajuda desse sinal de alta frequência, que é chamado de __sinal portador__, para transmitir o nosso sinal de amostragem. Esse processo é designado por __Modulação__.

Modulação é o processo de alteração dos parâmetros do sinal portador, de acordo com os valores instantâneos do sinal modulador.

#### Necessidade de Modulação

Os sinais da banda base são incompatíveis para transmissão direta. Para que o sinal consiga percorrer distâncias mais longas, a sua força tem que ser aumentada modulando-se com uma onda portadora de alta frequência, o que não afeta os parâmetros do sinal modulador.

#### Vantagens da Modulação

A antena usada para transmissão, tinha que ser muito grande (caso se use antena como emissor), se a modulação não for introduzida. O alcance da comunicação fica limitado porque a onda não pode viajar para uma dada distância sem que sofra distorção.

##### Algumas Vantagens do uso da Modulação

- O tamanho da antena é reduzido.
- Não ocorre mistura de sinal.
- O alcance da comunicação aumenta.
- Ocorre multiplexagem de sinais.
- São permitidos ajustes na largura de banda.
- A qualidade da receção melhora.

### Tipos de Modulação

Os tipos de modulação podem ser classificados em modulação de Onda Continua e Modulação de Pulso

#### Modulação em Onda Continua

Na modulação de onda contínua, uma onda senoidal de alta frequência é usada como onda portadora. Sendo dividida em modulação de amplitude e ângulo.

- Se a amplitude da onda portadora de alta frequência for variada de acordo com a amplitude instantânea do sinal modulante, essa técnica é chamada de __Modulação de Amplitude__.
- Se o ângulo da onda portadora for variado, de acordo com o valor instantâneo do sinal modulante, essa técnica é chamada de __Modulação Angular__.
  - Se a frequência da onda portadora é variada, de acordo com o valor instantâneo do sinal modulante, essa técnica é chamada de __Modulação em Frequência__.
  - Se a fase da onda portadora de alta frequência é variada de acordo com o valor instantâneo do sinal modulante, essa técnica é chamada de __Modulação de Fase__.

#### Modulação por Pulso

Na modulação por pulso, uma sequência periódica de pulsos retangulares é usada como onda portadora. Sendo esta dividida em modulação analógica e digital.

- Na técnica de modulação analógica, se a amplitude, duração ou posição de um pulso é variada pelos valores instantâneos do sinal de modulação de banda base, essa técnica é chamada de:
  - Modulação de Amplitude de Pulso (PAM)
  - Duração de Pulso / Modulação de Largura (PDM / PWM)
  - Modulação de Posição de Pulso (PPM).
- Na modulação digital é utilizada a Modulação por Código de Pulso (PCM), onde o sinal analógico é convertido em forma digital de 1s e 0s. Como o resultante temos um trem de pulso codificado, isso é chamado de PCM.

## Comunicação Analógica por Modulação de Pulso

### Modulação por Amplitude de Pulso - PAM

Na técnica de Modulação de Amplitude de Pulso (PAM), a amplitude da portadora de pulso varia, que é proporcional à amplitude instantânea do sinal de mensagem.

<div class="card-dcn">
    <img src="/images/communication_systems/projects/PAM.png" alt="Modulação por Amplitude de Pulso - PAM"/>
</div>

O sinal modulado por amplitude de pulso seguirá a amplitude do sinal original, à medida que o sinal traça o caminho de toda a onda. No PAM natural, um sinal amostrado na taxa de Nyquist pode ser reconstruído, contornando-o por meio de um filtro passa-baixo (LPF) eficiente com frequência de corte exata.

### Modulação por Largura o Pulso - PWM

Na técnica de __Modulação por Largura de Pulso (PWM)__ ou __Modulação por Duração de Pulso (PDM)__ ou __Modulação por Tempo de Pulso (PTM)__, a largura ou a duração ou o tempo da portadora de pulso varia proporcionalmente à amplitude instantânea do sinal de mensagem.

A largura do pulso varia, mas a amplitude do sinal permanece constante. Os limitadores de amplitude são usados para tornar a amplitude do sinal constante. Esses circuitos cortam a amplitude para um nível desejado e, portanto, o ruído é limitado. Sendo a borda de ataque do pulso constante, a borda de fuga varia de acordo com o sinal de mensagem. A forma de onda para este tipo de PWM é denotada como (a) na figura acima.

Existem três tipos de PWM:

- Sendo a borda de ataque do pulso constante, a borda de fuga varia de acordo com o sinal de mensagem. A forma de onda representada por A.
- Sendo a borda posterior do pulso constante, a borda dianteira varia de acordo com o sinal de mensagem. A forma de onda representada por B.
- Sendo o centro do pulso constante, a borda de ataque e a borda de fuga variam de acordo com o sinal de mensagem. A forma de onda representada por C.

<div class="card-dcn">
    <img src="/images/communication_systems/projects/PWM.png" alt="Modulação por Largura o Pulso - PWM"/>
</div>

### Modulação por Posição do Pulso - PPM

A Modulação de Posição de Pulso (PPM) é um esquema de modulação analógica em que a amplitude e a largura dos pulsos são mantidas constantes, enquanto a posição de cada pulso, com referência à posição de um pulso de referência, varia de acordo com o valor amostrado instantâneo de o sinal de mensagem.

O transmissor deve enviar pulsos de sincronização (ou simplesmente pulsos de sincronização) para manter o transmissor e o recetor em sincronia. Esses pulsos de sincronização ajudam a manter a posição dos pulsos. As figuras a seguir explicam a modulação da posição de pulso.

<div class="card-dcn">
    <img src="/images/communication_systems/projects/PPM.png" alt="Modulação por Posição do Pulso - PPM"/>
</div>

A modulação da posição de pulso é feita de acordo com o sinal modulado por largura de pulso. Cada borda posterior do sinal modulado por largura de pulso se torna o ponto de partida para pulsos no sinal PPM. Portanto, a posição desses pulsos é proporcional à largura dos pulsos PWM.

### Vantagens

Como a amplitude e a largura são constantes, a potência manuseada também é constante.

### Desvantagens

A sincronização entre o transmissor e o recetor é imprescindível.

## Comparação entre PAM, PWM e PPM

| PAM   |   PWM |   PPM     |
| :--   |   :-- |   :--     |
| A amplitude é variada | A largura é variada | A posição é variada |
| A largura de banda depende da largura do pulso | A largura de banda depende do tempo de elevação do pulso | A largura de banda depende do tempo de elevação do pulso |
| A largura de banda depende da largura do pulso | A largura de banda depende do tempo de elevação do pulso | A energia do transmissor instantâneo permanece constante com a largura dos pulsos |
| A complexidade do sistema é alta | A complexidade do sistema é baixa | A complexidade do sistema é baixa |
| A interferência de ruído é alta | A interferência de ruído é baixa | A interferência de ruído é baixa |
| É semelhante à modulação de amplitude | É semelhante à modulação de frequência | É semelhante à modulação de fase |

## Montagem do Sistema de Comunicação

Com vista facilitar a elaboração do sistema vou dividir o mesmo em várias partes, seguindo a seguinte ordem:

- Sinal de informação
- Modelação
  - PAM
  - PWM
  - PPM
- Desmodulação
  - PAM
  - PWM
  - PPM

### Dados Iniciais do Sistema

- Frequência máxima do sinal modulante: dos 300Hz a 2265.3Hz
- Amplitude máxima do sinal modulante: 2V
- Tipo de sinal modulante: Sinusoidal
- Frequência da portadora: 22.653KHz
- Amplitude da portadora: 3V

### Sinal de Informação

O primeiro passo é gerar um sinal de informação e somar a este uma componente continua.

Para realizar o somador vamos recorrer a de dois Ampop's TL081 e a um divisor resistivo, como representado no esquema a seguir.

Como o ganho do TL081 é negativo, vamos ter que usar dois em serie para que o sinal seja positivo.

<div class="card">
    <img src="/images/communication_systems/projects/Somador.png" alt="Esquema de montagem do Somador"/>
</div>

#### Cálculo das Resistências

$$EDC + e_m > 0$$

$$EDC=3V \text{ e } Vcc=12V$$

$$V_Ra=R_a/(R_a+R_b ) V_cc$$

Para garantir $EDC = 3V$

Se usar um $R_B=1k\Omega$

$R_A=3k\Omega$

Para garantir $I_{R_A}≈I_{R_B}$ o valor de $R_D$ tem ser muito superior ao de $R_B$.

Optei optar por: $R_D=10K\Omega$

Para que o ganho dos ampop's não afete a amplitude da frequência:

$$V_o=-\frac{V_i}{V_f}R_f⟺\frac{V_o}{V_i} =-\frac{R_f}{R_i} =-1$$
$$R_C=R_D=R_E=R_F=RG=10K$$

#### Simulação LTSpice

<div class="card">
    <img src="/images/communication_systems/projects/Somador-LTSpice.png" alt="Esquema de montagem do Somador LTSpice"/>
</div>

#### Sinal de Informação - $2.3kH_Z$

<div class="card">
    <img src="/images/communication_systems/projects/Sinais-Somador-2.3k.png" alt="Sinais para o Somador em 2.3kHz"/>
</div>

### PAM Modulação por Amplitude de Pulso

Para a PAM precisamos de gerar uma onda quadrada constante (trem de pulsos).

Optei por usar um NE555 em configuração Astável e com um duty cycle próximo do 50%.

#### Analisando a Datasheet do NE555

<div class="card">
    <img src="/images/communication_systems/projects/NE555-configuração.png" alt="NE555 Exemplo de circuito"/>
</div>

Pretendo usar um duty cycle próximo de $50%$.

O valor de $R_1$ deve ser muito pequeno. Optei por usar $R_1=1K$

$$I_{off}≪<100nA→R_1=1k\Omega$$

$R_2≫R_1  →D ≈ 50%$

$R_2>47k\Omega$ para um $D > 0.49$

$$f=\frac{1.44}{((R_1+R_2 ) C_1}⟺22.653k=\frac{1.44}{(1k+2×47C)}⟺C=6,70×10^{-7}$$

Optei por usar: $C= 0.5nF$ e $R_2=63k$

##### Simulação LTSpice

<div class="card">
    <img src="/images/communication_systems/projects/NE555-Astavel.png" alt="NE555 em configuração Astavel"/>
</div>

##### Sinal obtido

<div class="card">
    <img src="/images/communication_systems/projects/OndaQuadrada.png" alt="Sinal a saída do NE555 em configuração Astavel"/>
</div>

Obtive uma frequência de $22.642 kHz$ que é $\approx 22.653kHz$

#### Interruptor Analógico

Neste modulo era para se ter usado o HEF4066, no entanto não encontrei um modelo que funcionasse no LTspice, então, optei por usar o ADG1611 como alternativa.

##### Analisando a Datasheet do ADG1611

Analisando a Datasheet do ADG1611 podemos encontrar alguns circuitos exemplo. Vou usar o circuito a seguir, como base para o circuito que vou usar no projeto.

<div class="card">
    <img src="/images/communication_systems/projects/ADG1611.png" alt="Circuito exemplo utilizando ADG1611"/>
</div>

Usei o C_L=0.21nF para reduzir um pouco mais o ruído.

##### Simulação LTSpice

<div class="card">
    <img src="/images/communication_systems/projects/ADG1611-LTSpice.png" alt="Switch usando o ADG1611"/>
</div>

#### Sinal PAM obtido

##### Sinal de Informação em $2.3kHz$

<div class="card">
    <img src="/images/communication_systems/projects/PAM-2.3k.png" alt="Sinal PAM usando o Sinal de Informação em 2.3kHz"/>
</div>

##### Sinal de Informação em $300Hz$

<div class="card">
    <img src="/images/communication_systems/projects/PAM-300.png" alt="Sinal PAM usando o Sinal de Informação em 300Hz"/>
</div>