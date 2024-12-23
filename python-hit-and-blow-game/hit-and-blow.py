# coding:utf-8
import random
import tkinter as tk
import tkinter.messagebox as tmsg

def ButtonClick():
    # input contents by a player
    inputtxt = txtbox1.get()
    # judge whether the inputtxt is a four digit number
    isok = False
    if len(inputtxt) != 4:
        tmsg.showerror("エラー", "4桁の数字を入力してください")
    else:
        kazuok = True
        for i in range(4):
            if (inputtxt[i] < "0") or (inputtxt[i]> "9"):
                tmsg.showerror("エラー", "数字ではありません")
                kazuok = False
                break
        if kazuok:
            isok = True
    # judge whether the inputtxt is hit, blow or else
    if isok:
        hit = 0
        for i in range(4):
            if answer[i] == int(inputtxt[i]):
                hit += 1
        
        blow = 0
        for j in range(4):
            for i in range(4):
                if (int(inputtxt[j]) == answer[i] and answer[i] != int(inputtxt[i]) and answer[j] != int(inputtxt[j])):
                    blow += 1
                    break
        # judge wether the game is end or continue    
        if hit == 4:
            tmsg.showinfo("当たり", "おおめでとうございます。当たりです。")
            root.destroy()
        else:
            tmsg.showinfo("ヒント", "ヒット " + str(hit) + "/" + "ブロー " + str(blow))

# main program from here
# generate a four digit number at random    
answer = [random.randint(0, 9),
          random.randint(0, 9),
          random.randint(0, 9),
          random.randint(0, 9)]

# make a window
root = tk.Tk()
root.geometry("400x150")
root.title("数当てゲーム")
# make a label
label1 = tk.Label(root, text="数を入力してね", font=("Helvetica, 14"))
label1.place(x = 20, y = 20)
# make a text box
txtbox1 = tk.Entry(width = 4, font=("Helvetica, 28"))
txtbox1.place(x = 120, y = 60)
# make a button
button1 = tk.Button(root, text="チェック", font=("Helvetica, 14"), command=ButtonClick)
button1.place(x = 220, y = 60)
# show a window
root.mainloop()
