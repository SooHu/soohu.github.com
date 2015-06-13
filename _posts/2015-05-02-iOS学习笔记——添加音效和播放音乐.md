---
layout: post
author: SooHu
titile: iOS学习笔记——添加添加音效和播放音乐
category: iOS
tag: iOS
---

### 给Button添加音效


{% highlight Objective-C %}
#import <AudioToolbox/AudioToolbox.h>

@interface WebViewController () <UIWebViewDelegate>
{
    SystemSoundID soundID;//实例变量
}
@end


- (IBAction)goForward:(id)sender
{
    if (self.webView.canGoForward) {
        [self.webView goForward];
    }
    //传入音效名称和后缀名
    [self playSoundEffect:@"pop" type:@"wav"];
}


-(void)playSoundEffect:(NSString *)name type:(NSString *)type
{
	//得到音效文件的地址
    NSString *soundFilePath =[[NSBundle mainBundle] pathForResource:name ofType:type];
    //将地址字符串转换成url
    NSURL *soundURL = [NSURL fileURLWithPath:soundFilePath];
	
	//生成系统音效id
    AudioServicesCreateSystemSoundID((__bridge CFURLRef)soundURL, &soundID);
    //播放系统音效
    AudioServicesPlaySystemSound(soundID);
}
{% endhighlight %}


### 点击Button播放音乐
{% highlight Objective-C %}
#import "ViewController.h"
#import <AVFoundation/AVFoundation.h>//导入AVFoundation库
@interface ViewController () <AVAudioPlayerDelegate>//接受委托
@property AVAudioPlayer *player;
@end



- (IBAction)play:(id)sender
{
    NSString *soundFilePath = [[NSBundle mainBundle] pathForResource:@"life" ofType:@"mp3"];
    if (soundFilePath) {
        NSURL *soundURL = [NSURL fileURLWithPath:soundFilePath];
        NSLog(@"%@",soundURL);
        NSError *error = nil;
        AVAudioPlayer *player = [[AVAudioPlayer alloc] initWithContentsOfURL:soundURL error:&error];
        
        self.player = player;
        self.player.volume = 1;
        self.player.numberOfLoops = 0;
        self.player.delegate = self;//设置委托
        [self.player prepareToPlay];
        if(error){
            NSLog(@"初始化播放器过程发生错误,错误信息:%@",error.localizedDescription);
        }
        [self.player play];
    }
}
{% endhighlight %}