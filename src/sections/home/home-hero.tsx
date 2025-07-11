'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Scan, CheckCircle, Target, Lock, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { useTranslate } from '@/locales';
import Link from 'next/link';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { EXAMPLE_TEXTS } from '@/enums/mock-scan-result';


export function HomeHero() {
    const { t, currentLang } = useTranslate('home');
    const [inputText, setInputText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [selectedExample, setSelectedExample] = useState<string | null>(null);

    const generateMockResults = (text: string) => {
        const textLength = text.length;
        const aiPercent = Math.min(Math.max(Math.random() * 40 + 45, 15), 89);

        return {
            aiPercent: aiPercent.toFixed(1),
            confidence: t('homeHero.scanner.results.confidenceHigh'),
            categoryScores: [
                {
                    category: t('homeHero.scanner.results.layers.layer1.name'),
                    explanation: t('homeHero.scanner.results.layers.layer1.description'),
                    score: Math.random() * 30 + 60,
                    indicator: t('homeHero.scanner.results.layers.layer1.detail')
                },
                {
                    category: t('homeHero.scanner.results.layers.layer2.name'),
                    explanation: t('homeHero.scanner.results.layers.layer2.description'),
                    score: Math.random() * 25 + 55,
                    indicator: t('homeHero.scanner.results.layers.layer2.detail')
                },
                {
                    category: t('homeHero.scanner.results.layers.layer3.name'),
                    explanation: t('homeHero.scanner.results.layers.layer3.description'),
                    score: Math.random() * 35 + 50,
                    indicator: t('homeHero.scanner.results.layers.layer3.detail')
                },
                {
                    category: t('homeHero.scanner.results.layers.layer4.name'),
                    explanation: t('homeHero.scanner.results.layers.layer4.description'),
                    score: Math.random() * 40 + 45,
                    indicator: t('homeHero.scanner.results.layers.layer4.detail')
                },
                {
                    category: t('homeHero.scanner.results.layers.layer5.name'),
                    explanation: t('homeHero.scanner.results.layers.layer5.description'),
                    score: aiPercent,
                    indicator: t('homeHero.scanner.results.layers.layer5.detail')
                }
            ],
            summary: textLength > 50 ? t('provideResultDesc') : t('homeHero.errors.tooShort'),
            suggestions: [
                t('homeHero.scanner.results.reasons.reason1'),
                t('homeHero.scanner.results.reasons.reason2'),
                t('homeHero.scanner.results.reasons.reason3'),
                t('homeHero.scanner.results.reasons.reason4')
            ],
            fullAnalysis: t('homeHero.scanner.results.fullAnalysis'),
            shortAnalysisPreview: t('homeHero.scanner.results.shortAnalysisPreview')
        };
    };

    const handleScan = async () => {
        if (!inputText.trim()) return;

        if (inputText.length < 250) {
            toast.error(t('homeHero.errors.tooShort'), {
                duration: 1500,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none'
                },
                position: 'bottom-center'
            });
            return;
        }

        setIsScanning(true);
        setScanProgress(0);
        setShowResults(false);

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    setShowResults(true);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 200);
    };

    const handleExampleSelect = (key: string, text: string) => {
        setInputText(text);
        setSelectedExample(key);
        setShowResults(false);
    };

    const mockResults = generateMockResults(inputText);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white relative w-full font-onest">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-40 right-40 w-24 h-24 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="lg:w-full px-2 py-10 lg:px-8 lg:py-12 relative w-full flex justify-center items-center">
                <div className={`w-full lg:flex lg:px-16 2xl:px-32 xl:gap-16 ${showResults
                    ? 'lg:items-start'
                    : 'lg:items-start'
                    }`}>
                    <div className={`w-full lg:col-span-2 ${showResults
                        ? 'space-y-6 lg:space-y-4 lg:sticky lg:top-52 lg:self-start lg:max-h-screen lg:overflow-y-auto' // Sticky + scrollable
                        : 'space-y-8'
                        }`}>
                        <div className="animate-in fade-in duration-1000">
                            <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 
                                            px-2 py-1.5 sm:px-3 sm:py-1 lg:px-4 lg:py-2 
                                            text-xs lg:text-sm font-medium border border-purple-200/50 
                                            shadow-sm hover:shadow-md transition-all duration-300
                                            inline-flex items-center max-w-[95vw] whitespace-normal
                                            leading-tight"
                            >
                                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 flex-shrink-0 mt-0.5" />
                                <span className="break-words">
                                    {t('homeHero.badge')}
                                </span>
                            </Badge>
                        </div>

                        <div className={`space-y-6 animate-in slide-in-from-left duration-700 delay-200 ${showResults ? 'lg:space-y-4' : ''
                            }`}>
                            <div className="space-y-4">
                                <h1 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                    {t('homeHero.title')}{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">
                                        {t('homeHero.titleHighlight')}
                                    </span>
                                </h1>

                                {currentLang.value === 'tr' && (
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 backdrop-blur-sm border border-blue-200/60 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                                        <p className="text-blue-800 font-medium text-sm flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            {t('homeHero.turkishFirst')}
                                        </p>
                                    </div>
                                )}

                                <p className="text-body2 text-gray-600 leading-relaxed">
                                    {t('homeHero.description')}
                                </p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-2 px-1 gap-3 animate-in slide-in-from-left duration-700 delay-400 ${showResults ? 'lg:gap-2' : ''
                            }`}>
                            <div className="">
                                <div className="flex items-center space-x-3">
                                    <div className="group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                            {t('homeHero.stats.accuracy')}
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">{t('homeHero.stats.accuracyLabel')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="flex items-center space-x-3">
                                    <div className="group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                            {t('homeHero.stats.layers')}
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">{t('homeHero.stats.layersLabel')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`space-y-4 animate-in slide-in-from-left duration-700 delay-600 ${showResults ? 'lg:space-y-2' : ''
                            }`}>
                            {[
                                t('homeHero.features.feature1'),
                                t('homeHero.features.feature2'),
                                t('homeHero.features.feature3')
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 group"
                                    style={{ animationDelay: `${600 + index * 100}ms` }}
                                >
                                    <div className="relative">
                                        <CheckCircle className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
                                        <div className="absolute inset-0 bg-green-200/40 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium text-body3">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="animate-in slide-in-from-left duration-700 delay-800">
                            <Link href={'/sign-in'}>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <span className="font-medium">{t('homeHero.ctaButton')}</span>
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                            </Link>
                        </div>

                        {showResults && (
                            <div className="lg:pb-8"></div>
                        )}
                    </div>

                    <div className={`w-full lg:col-span-3 animate-in slide-in-from-right duration-700 delay-300 lg:ml-16 mt-8 lg:mt-0 ${showResults ? '' : 'lg:sticky lg:top-8'
                        }`}>
                        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden group hover:shadow-3xl transition-all duration-500">
                            <CardHeader className='border-b'>
                                <CardTitle className="text-2xl font-bold text-gray-900 flex gap-2 items-center">
                                    <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        {t('homeHero.scanner.title')}
                                    </span>
                                    <p className="text-gray-600 text-body3 mt-1"> - {t('homeHero.scanner.subtitle')}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 py-1 space-y-8 relative z-10">
                                {!showResults && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <Textarea
                                                placeholder={t('homeHero.scanner.placeholder')}
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                className="md:min-h-[250px] min-h-[150px] w-full border-2 shadow-none focus-visible:ring-0 resize-none break-words"
                                                style={{
                                                    animation: 'border-pulse 3s ease-in-out infinite',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    overflowWrap: 'anywhere',
                                                    maxWidth: '100%',
                                                    width: '100%'
                                                }}
                                                maxLength={1000}
                                                rows={6}
                                                wrap="soft"
                                            />

                                            <div className="flex justify-between items-center text-sm text-gray-500">
                                                <span>{inputText.length}/1.000 {t('homeHero.scanner.characterCount')}</span>
                                                <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${inputText.length >= 250
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {inputText.length >= 250 ? t('homeHero.scanner.readyToScan') : t('homeHero.scanner.minCharacters')}
                                                </div>
                                            </div>

                                            <div className='w-full flex justify-between items-center'>
                                                <div className="px-1 py-4 border-t border-gray-100 w-full">
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        {
                                                            currentLang.value === 'tr' ? (
                                                                <span className="text-sm text-gray-500 mr-2">Örnek Metin:</span>
                                                            ) : (
                                                                <span className="text-sm text-gray-500 mr-2">Try an example:</span>
                                                            )
                                                        }
                                                        {
                                                            EXAMPLE_TEXTS.map((example) => (
                                                                <Button
                                                                    key={example.id}
                                                                    size={"sm"}
                                                                    onClick={() => handleExampleSelect(example.id, currentLang.value === 'tr' ? example.tr : example.en)}
                                                                    className={`text-[10px] rounded-xl border transition-all ${selectedExample === example.id
                                                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                                                        }`}
                                                                >
                                                                    {example.id.toLocaleUpperCase()}
                                                                </Button>
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={handleScan}
                                                    disabled={!inputText.trim() || isScanning}
                                                    className=" bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                                                >
                                                    {isScanning ? (
                                                        <div className="flex items-center gap-2">
                                                            <Scan className="w-5 h-5 animate-spin" />
                                                            {t('homeHero.scanner.scanning')}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <Scan className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                                            {t('homeHero.scanner.scanButton')}
                                                        </div>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>

                                        {isScanning && (
                                            <div className="space-y-4 animate-in fade-in duration-500">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-purple-600 font-medium flex items-center gap-2">
                                                        <Scan className="w-4 h-4 animate-spin" />
                                                        {t('homeHero.scanner.scanningProgress')}
                                                    </span>
                                                    <span className="text-gray-500 font-mono">{Math.round(scanProgress)}%</span>
                                                </div>
                                                <Progress value={scanProgress} className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300" />
                                                </Progress>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {showResults && (
                                    <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
                                        <div className="text-center space-y-3">
                                            <div className="relative inline-block">
                                                <div className="text-5xl font-bold text-gray-900 blur-[8px] select-none">
                                                    %{mockResults.aiPercent}
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Lock className="w-8 h-8 text-purple-600" />
                                                </div>
                                            </div>
                                            <p className="text-gray-600 font-medium">{t('homeHero.scanner.results.aiProbability')}</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200/60 shadow-sm">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                                    <span className="font-bold text-purple-800">{t('homeHero.scanner.results.regressionProTitle')}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{t('homeHero.scanner.results.regressionProDesc')}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                                <Target className="w-5 h-5 text-purple-600" />
                                                {t('homeHero.scanner.results.layerAnalysisTitle')}
                                            </h4>

                                            {mockResults.categoryScores.slice(0, 1).map((category, index) => (
                                                <div key={index} className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="font-semibold text-gray-800">{category.category}</span>
                                                        <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                            %{category.score.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                                                            style={{ width: `${category.score}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{category.explanation}</p>
                                                </div>
                                            ))}

                                            <div className="relative">
                                                <div className="filter blur-md opacity-40 pointer-events-none space-y-3">
                                                    {mockResults.categoryScores.slice(1).map((category, index) => (
                                                        <div key={index + 1} className="bg-gray-50 rounded-2xl p-6">
                                                            <div className="flex justify-between items-center mb-3">
                                                                <span className="font-semibold text-gray-800">{category.category}</span>
                                                                <span className="text-lg font-bold text-purple-600">%{category.score.toFixed(1)}</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full" style={{ width: `${category.score}%` }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
                                                        <Lock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                                        <p className="text-sm text-gray-600 font-medium"> {t('homeHero.scanner.registration.subtitle')} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 text-center space-y-4 border border-purple-200/60">
                                            <div className="relative">
                                                <Lock className="w-10 h-10 text-purple-600 mx-auto" />
                                                <div className="absolute inset-0 bg-purple-200/40 rounded-full scale-0 animate-ping" style={{ animationDelay: '1s' }} />
                                            </div>
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                {t('homeHero.scanner.registration.title')}
                                            </h3>
                                            <p className="text-gray-600">
                                                {t('homeHero.scanner.registration.subtitle')}
                                            </p>
                                            <Link href={'/sign-up'} className="pt-2 block">
                                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                                    <ChevronRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                                                    {t('homeHero.scanner.registration.registerButton')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}