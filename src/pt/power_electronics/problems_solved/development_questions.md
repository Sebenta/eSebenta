# Perguntas de Desenvolvimento

## Pergunta  1
Enumere 3 vantagens e 3 desvantagens das fontes lineares face às fontes comutadas:

:::details Resposta
- Vantagens
    - menor grau de complexidade
    - ripple de saída menor
    - resposta transitória mais rápida
- Desvantagens
    - $V_o$ fortemente dependente das características do zener
    - $\Delta V_o$ pode ser alto
    - $V_o$ baixa quando $V_i$ baixa
:::

## Pergunta 2
Enuncie e explique sucintamente as vantagens das fontes reguladas a transístores paralelo face as fontes a transístor em série.

:::details Resposta
- Rendimento mais elevado.
- Dissipam um menor valor de potência.
- O transístor encontra-se protegido contra curto-circuito, não passa nenhuma corrente por ele.
:::

## Pergunta 3
Considere o conversor do tipo Step-Up. Desenhe o Circuito. Deduza com a ajuda das formas de onda a variação residual da tensão de saída.

:::details Resposta

<div class="card-dcn">
    <img src="/images/power_electronics/problems_solved/Step-Up-A.png" alt="Step Up versão com transístor"/>
</div>

### Considerações: 

- os componentes são ideais
- opera em regime permanente

### Analise e criação do gráfico

$V_0 > E$

<div class="card-dcn">
    <img src="/images/power_electronics/problems_solved/Step-Up-B.png" alt="Step Up"/>
</div>

#### Vou começar a análise com Switch Ligado

$-V_s + V_D + V_o = 0$

$V_s= 0$

$V_D = - V_o \to \$ O díodo esta ao corte

$-E + V_L + V_s = 0 \Leftrightarrow V_L =E$ 

$$I_L = \frac{1}{L} \int_{t_0}^{t}{V_L\ dt + I_L}$$

#### Quando $I_L$ for máximo o switch bloqueia e o díodo passa a conduzir

$-E + V_L + V_D + V_0 = 0$

$V_D = E - V_L - V_o$

$V_L = E - V_o$

$$I_L = \frac{1}{L}\int_{t_0}^{t}{E-V_o dt+I_{Lmax}}$$

$$I_L = \frac{E-V_o}{L}(t-DT_S)+I_{Lmax}$$

#### Como o conversor esta operar em regime permanente na bobine nunca é zero.

<div class="card-dcn">
    <img src="/images/power_electronics/problems_solved/Step-Up-C.png" alt="Step Up Gráficos"/>
</div>

$$V_{Lmed} = \frac{E. DT_S + (E-V_o)(1-D)T_s}{T_s} = 0$$

$$V_0 = \frac{E}{1-D}\quad \mid\mid \quad0 < D < 1$$

#### Podemos verificar que a tensão de saída pode variar entre $E$ até $\infty$.

### Cálculo da Bobine

$$L = E \frac{DT_s}{\Delta I_l}$$

$$\Delta I_L = E \frac{DT_s}{L }$$

### Cálculo do Condensador

$$I_0 = I_{Dmed} \times I_C \approx I_{D_{Calternada}}(t)$$

$$I_D = I_C + I_0  \quad \mid\mid \quad I_C = I_D - I_o$$

$$X_C = \frac{1}{2 \pi f C}$$

$$V_C = \frac{1}{C}\int I_C\ dt + V_{Cinicial}$$

$$I_C = C \frac{\Delta V_C}{\Delta t}$$

$$\Delta t = DT_S$$

$$I_C = -I_0$$

$$C = \frac{I_0.DT_S}{\Delta V_C}$$

### Cálculo do $\Delta V_o$

$$\Delta V_0 = \frac{\Delta Q}{C} = \frac{\frac{\frac{\Delta I_L}{2} DT_s}{2} + \frac{\frac{\Delta I_L}{2}(D-1)T_s}{2} }{C} = \frac{ \frac{\frac{\Delta I_L}{2} T_s}{2} }{C} = \frac{\frac{\Delta I_L . T}{8}}{C} = \frac{\Delta I_L}{8.f.C}$$

$$\Delta V_0 = \frac{\Delta I_L}{8.f.C}$$
:::