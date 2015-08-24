---
layout: post
author: SooHu
titile: iOS学习笔记——利用delegate实现两个页面间的数据传输
category: iOS
tag: iOS
---
### 目标
从A页面通过按钮跳转到B，在B页面设置参数，然后返回A页面，并将参数传递回A页面

### 实现

实现两个页面间的数据传输有多种方法

+ 使用SharedApplication,定义一个变量来传递
+ 使用文件，或者NSUserdefault来传递
+ 通过一个单例的class来传递
+ 通过Delegate来传递
等

然后今天想在Demo里使用delegate完成传值，以为之前看过协议和委托，应该能轻松完成。但是却花了几个小时才完成，下面是含泪总结：


### 1. 在B页面.h文件声明协议，并设置公共变量
{% highlight Objective-C %}
@protocol SettingViewPassValueDelegate <NSObject>
- (void)passSettingValue:(NSMutableArray *)noiseSwitch noiseVolume:(NSMutableArray *)noiseVolume;
- (void)passTestValue;
@end

//防止循环引用
@property (nonatomic, weak) id<SettingViewPassValueDelegate> delegate;

{% endhighlight %}


### 2. 在B页面需要的地方调用委托函数
这里在viewDidAppear时调用。
{% highlight Objective-C %}
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:(BOOL)animated];
    
    [self.delegate passTestValue];
    [self.delegate passSettingValue:self.nosieSwitch noiseVolume:self.nosieVolumeValue];
}

{% endhighlight %}

### 3. 在A页面.m文件接收协议，并实现必要委托函数
{% highlight Objective-C %}
#import "B.h"

@interface MeditationViewController () <SettingViewPassValueDelegate>//接受协议
@end

#pragma mark - delagate methods
- (void)passSettingValue:(NSMutableArray *)noiseSwitch noiseVolume:(NSMutableArray *)noiseVolume
{
    self.noiseSwitch = noiseSwitch;
    self.noiseVolumeValue = noiseVolume;
    NSLog(@"did i ?");
}

- (void)passTestValue
{
    NSLog(@"here is delagate");
}
{% endhighlight %}

### 4. 最重要的一步！指明委托对象！指明B的委托对象是A-ViewController
我就是在这一步出错的，因为网上的教程和博客比较老，而且举得例子基本上是抄来抄去，所以我一直没发现我的错误在哪里。
因为我实在storyboard上创建的viewController，并且A页面是通过一个按钮以Segue的方式跳转到B页面，所以我这样设置之后就正确了。

{% highlight Objective-C %}

- (void)prepareForSegue:(nonnull UIStoryboardSegue *)segue sender:(nullable id)sender
{
    if ([segue.identifier isEqualToString:@"toSettingView"]) {//注意设置segue的id
        SettingViewController *svc = [[SettingViewController alloc] init];
        svc = segue.destinationViewController;
        svc.delegate = self;//就是在这里设置委托对象
    }
}
{% endhighlight %}

我之前想通过下面的代码设置委托对象，结果发现是错误的：
{% highlight Objective-C %}
UIStoryboard* storyboard = [UIStoryboard storyboardWithName:@"main" bundle:[NSBundle mainBundle]];
SettingViewController *settingViewController = (SettingViewController *)[storyboard instantiateViewControllerWithIdentifier:@"SettingViewController"];  

{% endhighlight %}

`NSLog`了一下，发现Segue后出现的SettingViewController实例和上面代码获得的实例是不同的。原因暂时还没研究，先这样了。
