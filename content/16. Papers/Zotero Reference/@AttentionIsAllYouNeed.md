---
aliases: ["Attention is All you Need", "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, Illia Polosukhin (2017) Attention is All you Need"]
title: "Attention is All you Need"
authors: [Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, Illia Polosukhin]
online-uri: http://zotero.org/users/15998618/items/SD2QHMYT
year: 2017
date: 2017-01-01
citekey: AttentionIsAllYouNeed
class: journalArticle
language: en
cover: https://covers.openlibrary.org/b/isbn/undefined-M.jpg
---

### zotero tags: ✅  

> [!info]- Metadata
> abstract:: The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring signiﬁcantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 Englishto-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.0 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature.
> pdf:: [Vaswani et al. - Attention is All you Need.pdf](zotero://select/library/items/6IBV9SYA)
> extra:: "Citation Key: AttentionIsAllYouNeed"
> bibliography:: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). _Attention is All you Need_."


🔥🔥🔥  everything above this line might change during an update  🔥🔥🔥
%% begin notes %%%% end notes %% 
%% begin annotations %%
⬇️  *Imported (Annotations) on 2024-12-15#23:37:26*  ⬇️

> [!annotation-blue] Question, Understanding, Vocabulary
> 
> 
>In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.
> 
> 2024-12-15#23:25 
> 
> (see [PDF p. 2](zotero://open-pdf/library/items/6IBV9SYA?page=2&annotation=4IDBAMDT))

> [!annotation-yellow] Relevant, Important
> 
> 
>Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension, abstractive summarization, textual entailment and learning task-independent sentence representations
> 
> 2024-12-15#20:50 
> 
> (see [PDF p. 2](zotero://open-pdf/library/items/6IBV9SYA?page=2&annotation=LF47V5LV))

> [!annotation-orange] Very Important
> 
> 
>Most competitive neural sequence transduction models have an encoder-decoder structure [5, 2, 29]. Here, the encoder maps an input sequence of symbol representations (x1, ..., xn) to a sequence of continuous representations z = (z1, ..., zn). Given z, the decoder then generates an output sequence (y1, ..., ym) of symbols one element at a time. At each step the model is auto-regressive [9], consuming the previously generated symbols as additional input when generating the next. The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder, shown in the left and right halves of Figure 1, respectively.
> 
> 2024-12-15#23:25 
> 
> (see [PDF p. 2](zotero://open-pdf/library/items/6IBV9SYA?page=2&annotation=XM78QHSD))

> [!annotation-yellow] Relevant, Important
>
> ![[16. Papers/Zotero Reference/img/AttentionIsAllYouNeed/image-3-x173-y371.png|300]]
> 
> 2024-12-15#22:01 
> 
> (see [PDF p. 3](zotero://open-pdf/library/items/6IBV9SYA?page=3&annotation=QCU5ZBMW))

> [!annotation-red] Disagree
> 
> 
>Decoder: The decoder is also composed of a stack of N = 6 identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. Similar to the encoder, we employ residual connections around each of the sub-layers, followed by layer normalization. We also modify the self-attention sub-layer in the decoder stack to prevent positions from attending to subsequent positions. This masking, combined with fact that the output embeddings are offset by one position, ensures that the predictions for position i can depend only on the known outputs at positions less than i.
> 
> 2024-12-15#22:01 
> 
> (see [PDF p. 3](zotero://open-pdf/library/items/6IBV9SYA?page=3&annotation=QCJQSCTK))

> [!annotation-yellow] Relevant, Important
> 
> 
>3.4 Embeddings and Softmax Similarly to other sequence transduction models, we use learned embeddings to convert the input tokens and output tokens to vectors of dimension dmodel. We also use the usual learned linear transformation and softmax function to convert the decoder output to predicted next-token probabilities. In our model, we share the same weight matrix between the two embedding layers and the pre-softmax linear transformation, similar to [24]. In the embedding layers, we multiply those weights by √dmodel.
> 
> 2024-12-15#23:11 
> 
> (see [PDF p. 5](zotero://open-pdf/library/items/6IBV9SYA?page=5&annotation=LVVXSADW))

%% end annotations %%

%% Import Date: 2024-12-15T23:37:33.976+09:00 %%
