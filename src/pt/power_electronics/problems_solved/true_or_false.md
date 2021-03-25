# Verdadeiro ou Falso

## Pergunta 1
Nas mesma condições de carga um retificador de onda completa apresenta uma onda com o dobro da frequência que a de um retificador de meia-onda.

:::details Resposta correta
__Verdadeiro__

O retificador de meia onda só permite a passagem carga durante um dos semiciclos. 

O retificador de onda completa faz com que tanto o semiciclo positivo quanto o negativo caiam sobre a carga com a mesma polaridade.

Pegando no exemplo do Retificador de Onda Completa com Derivação Central.

- Durante o semiciclo positivo, o díodo $D_1$ conduz, e o díodo $D_2$ corta, fazendo com que a tensão na carga seja positiva e igual à tensão do secundário superior do transformador.

- Durante o semiciclo negativo, o díodo $D_1$ corta, e o díodo $D_2$ conduz, fazendo com que a tensão na carga tenha a mesma polaridade que a da situação anterior e a mesma amplitude.

Originado assim uma onda com o dobro da frequência.
:::

## Pergunta 2
Para as mesma condições de saída o ripple de tensão de um conversor DC-DC é inferior quando comparado com uma fonte regulada de tensão.

:::details Resposta correta
__Falso__

Para as mesma condições o ripple de tensão de saída de um conversor DC-DC é superior ao das fontes reguladas de tensão
:::

## Pergunta 3
Um regulador de tensão linear pode ser substituído por um divisor resistivo.

:::details Resposta correta
__Falso__

A utilização de um divisor resistivo num regulador de tensão linear é de amostragem de tensão de saída.
:::

## Pergunta 4
A região de funcionamento segura de um BJT (Bipolar Junction Transistor) é limitada pela tensão máxima, corrente máxima e pela potência máxima.

:::details Resposta correta
__Falso__

Para além destas é também limitada pelo 2º breakdown.
:::

## Pergunta 5
Um conversor Flyback, devido ao fato de utilizar um transformador (isolamento elétrico) pode funcionar sem carga (circuito em vazio).

:::details Resposta correta
__Falso__

Este circuito só funciona se tiver carga pois se $I_o = 0A$, então $L_2$ vai tender para infinito.
:::

## Pergunta 6
Nas mesma condições da saída o ripple de corrente de um conversor Forward é sempre menor que o de um conversor Flyback.

:::details Resposta correta
__Falso__

O ripple de tensão de um conversor Forward é sempre menor que o de um conversor Flyback.
$\Delta V_{o_{forward}} \lt \Delta V_{0_{folback}}$
:::

## Pergunta 7
Os reguladores integrados da família 78xx estão inerentemente protegidos contra sobrecarga e tensões reversas.

:::details Resposta correta
__Verdadeiro__

Este tipo de reguladores já incorporam proteção térmica, proteção contra curto-circuito e proteção contra saída do ponto de funcionamento da SOAR.
:::

## Pergunta 8
Uma das desvantagens das fontes reguladas, quer seja configuração série quer seja configuração paralela é necessitarem de proteção contra curto-circuito.

:::details Resposta correta
__Falso__

No caso da configuração paralelo, o transístor já se encontra protegido contar curto-circuito.
:::

## Pergunta 9
Num conversor do tipo Buck-Boost com uma tensão de entrada positiva não é possível obter uma tensão à saída positiva.

:::details Resposta correta
__Falso__

Sim, é possível obter uma tensão positiva à saída com uma tensão positiva à entrada, invertendo a polaridade da carga. Se trocarmos os terminais de saída, obtemos uma tensão positiva em vez de uma negativa. 
:::

## Pergunta 10
Os conversores com isolamento galvânico, com transformadores, do tipo Flyback e Forward não impõem qualquer limitação ao factor de serviço, desde que este esteja compreendido entre 0 e 1. 

:::details Resposta correta
__Falso__

Já que o duty-cycle no Forward não pode ser maior do que 0.5

$$V_i \delta_1 T + (\frac{-V_i}{N} \delta_2 T) \times \delta_3T = 0$$

$$V_i \delta_1 T = (\frac{V_i}{N} \delta_2 T)$$

$$V_i \delta_1\ = V_i \delta_2$$

$$\delta_1 = \delta_2\, \text{com }\delta_3 > 0$$

$$\delta_3 = 1-2\delta_1 > 0 \Leftrightarrow 1 \gt 2\delta_1 \Leftrightarrow \delta_1 \lt 0.5$$
:::

## Pergunta 11
Num Conversor do tipo Step-Up quanto maior for a frequência de comutação menor é o valor da bobina e o valor do condensador.

:::details Resposta correta
__Verdadeira__

Pela fórmula $ΔVo = Vo*D*Ts/(R*C)$, é possível ver que se aumentarmos a frequência, temos de diminuir o valor do condensador para manter a igualdade.

Pela fórmula $ΔiL = Vin*D/(L*f)$, é de novo possível ver que se aumentarmos a frequência, temos de diminuir o valor da bobina para manter a igualdade.
:::