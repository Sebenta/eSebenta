# Perguntas de Desenvolvimento

## Pergunta  1

O que é amostragem? O que é o teorema de amostragem?

:::details Resposta
A amostragem de um sinal é o processo pelo qual o sinal passa a ser representado por um conjunto discreto de números. Estes números, ou amostras, são iguais ao valor do sinal em instantes bem determinados. As amostras devem ser obtidas de maneira a que seja possível reconstruir o sinal com exatidão. Ou seja, a forma de onda original, definida em tempo contínuo, passa a ser representada em tempo discreto por amostras obtidas em instantes de amostragem espaçados convenientemente.

Ao intervalo de tempo entre as amostragens chama-se __intervalo de amostragem, $T_S$__. o seu inverso é a frequência de amostragem, $f_s=\frac{1}{T_S}$ amostras por segundo.

Para que seja possível reconstruir o sinal original é necessário que a frequência de amostragem seja, no mínimo, igual ao dobro da frequência máxima contida no sinal analógico - __Teorema da amostragem__.

Caso contrário produz-se um fenómeno indesejável, denominado de _aliasing_ que traduz num sobreposição de espectro que inviabiliza a correta recuperação do sinal.

À frequência de amostragem mínima chama-se __frequência de Nyquist__. 
:::

## Pergunta 2

Defina PAM e diga quais as suas desvantagens.

:::details Resposta
__Modulação de amplitude de pulso (PAM)__,é uma forma de modulação de sinal onde as informações da mensagem são codificadas na amplitude de uma série de pulsos de sinal. É um esquema analógico de modulação de pulso no qual as amplitudes de um trem de pulsos portadores são variadas de acordo com o valor amostral do sinal de mensagem. A desmodulação é realizada detetando o nível de amplitude do portador em cada período.

__As desvantagens:__

- Como a amplitude dos pulsos varia, a potência de pico do sinal de modulação é maior.
- A energia do transmissor instantâneo varia com a amplitude dos pulsos.
- A complexidade do sistema é alta.
- A interferência de ruído é alta.
:::

## Pergunta 3

O que se subentende com taxa de Nyquist?

:::details Resposta
No caso da taxa de Nyquist, a frequência de amostragem é igual à frequência máxima do sinal e, portanto, os ciclos sucessivos do espectro não se sobrepõem.
:::
